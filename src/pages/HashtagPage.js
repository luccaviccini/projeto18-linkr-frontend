import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Post from "../components/Post";
import HashtagBox from "../components/Trending";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import styled from "styled-components";


export default function HashtagPage() {
    const { hashtag } = useParams();
    const [postsData, setPostsData] = useState([]);

    const navigate = useNavigate();

    const { userData} = useContext(UserContext)
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
                    <Title data-test="hashtag-title"># {hashtag}</Title>
                    {postsData && postsData.map(post => <Post data-test="post"
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
                    />)}
                </LeftContent>
                <HashtagBox />
            </Container>
        </>
    );
}


const Container = styled.div`
  width: 99vw;
  height: auto;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 41px;
  color: #ffffff;
  font-family: "Oswald", sans-serif;
  margin: 75px 0 42px;
`;

const LeftContent = styled.div`
  width: auto;
  height: auto;
  margin-right: 25px;
  @media (max-width:900px){
       margin: auto;
    }
`;