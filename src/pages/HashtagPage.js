import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Post from "../components/Post";
import HashtagBox from "../components/Trending";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import styled from "styled-components";
import Searchbar from "../components/Searchbar";
import Loading from "../components/Loading";


export default function HashtagPage() {
    const { hashtag } = useParams();
    const [postsData, setPostsData] = useState([]);

    const navigate = useNavigate();

    const { userData } = useContext(UserContext)
    const [userId, setUserId] = useState();
    const token = userData.token

    async function listAllHashtagsPosts() {
        try {
            const request = await axios.get(
                `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPostsData(request.data);
        } catch (_) {
            navigate("/");
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/');
            alert('Faça o login para acessar essa rota.')
        }
        listAllHashtagsPosts();

    }, [hashtag]);


    function likeDislikePost(id, likedByUser) {
        const url = `${process.env.REACT_APP_API_URL}/timeline/${id}`
        const promise = axios.post(url)
        promise.then(() => listAllHashtagsPosts())
        promise.catch(err => { console.log(err) })
    }

    return (
        <>
            <NavBar />
            <Container>
                <LeftContent>
                    <SearchContainer>
                        <Searchbar />
                    </SearchContainer>
                    <Title data-test="hashtag-title"># {hashtag}</Title>
                    {!postsData ? <h3>"There are no posts yet"</h3> :
                        postsData.length > 0 ?
                            postsData.map((post) => (
                                <Post data-test="post"
                                    key={post.id}
                                    id={post.id}
                                    userId={post.userId}
                                    username={post.author}
                                    siteUrl={post.siteUrl}
                                    title={post.title}
                                    description={post.description}
                                    userImg={post.pictureUrl}
                                    imageUrl={post.imageUrl}
                                    likes={post.likes}
                                    lastTwoUsersLiked={post.users}
                                    usersLikes={post.postLiked}
                                    metaDescription={post.metaDescription}
                                />
                            )) :
                            (<LoadingContainer>
                                Loading <Loading />
                            </LoadingContainer>)

                    }
                </LeftContent>
                <Trending>
                    <HashtagBox />
                </Trending>
            </Container>
        </>
    );
}

const Trending = styled.div`
    margin-top:50px;
    display: flex;
`

const Container = styled.div`
    
  display: flex;
  justify-content: space-between;
  margin:  auto;
  width: 100%;
  max-width: 937px;
  margin-top: 22px;
  padding-top: 53px;
  padding-bottom: 70px;
  

    @media (max-width: 937px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.h1`
  font-size: 41px;
  color: #ffffff;
  font-family: "Oswald", sans-serif;
  margin: 75px 0 42px;
`;

const LeftContent = styled.div`
    width: 100%;
  max-width: 611px; 
  
  

  h3{
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    margin: 20px;
  }
  @media (max-width:900px){
       margin: auto;
    }
`;

const LoadingContainer = styled.div`
  width: 100%;
  max-width: 611px;
  height: 200px;
  background: lightgrey;  
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 16px;
  column-gap: 24px;
  font-family: "Lato";
  font-style: bold;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #707070;
  margin-bottom: 10px;


  @media (max-width: 937px) {
    border-radius: 0;
    padding: 0 18px;
  }

`;

const SearchContainer = styled.div`
@media (min-width: 480px) {
          display: none;
        }
`;