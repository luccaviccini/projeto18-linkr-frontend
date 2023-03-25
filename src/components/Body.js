import styled from "styled-components";
import Post from "./Post.js";
import NewPost from "./NewPost.js";
import Trending from "./Trending.js"
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext.js";
import Searchbar from "./Searchbar";
import axios from "axios";
import Loading from "./Loading.js";

export default function Body() {
  const { userData, updatePosts } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    async function getTimeline(token) {
      setPosts([]);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/timeline`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page"
        );
      }
    }
  
    if (userData.token) {
      getTimeline(userData.token);
    }
  }, [userData.token, updatePosts]);



  return (
    <BodyContainer>
      <Left>
      <SearchContainer>
         <Searchbar/>
      </SearchContainer>
        <Title>timeline</Title>
        <NewPost />
        {!posts ? <h3>"There are no posts yet"</h3> : 
        posts.length > 0 ?
          posts.map((post) => (
            <Post
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
              Loading <Loading/>
          </LoadingContainer>)
          
        }
        
      </Left>
      <Trending />
    </BodyContainer>
  );
}

const Title = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin-bottom: 43px;

    @media (max-width: 937px) {
        padding-left: 20px;
    }
`;
const BodyContainer = styled.div`
    
  display: flex;
  justify-content: space-between;
  margin:  auto;
  width: 100%;
  max-width: 937px;
  margin-top: 72px;
  padding-top: 53px;
  padding-bottom: 70px;
  

    @media (max-width: 937px) {
        flex-direction: column;
        align-items: center;
    }
`;
const Left = styled.div`
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