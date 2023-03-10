import styled from "styled-components";
import Post from "./Post.js";
import NewPost from "./NewPost.js";
import Trending from "./Trending.js"
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext.js";
import axios from "axios";

export default function Body() {
  const { userData } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // get token from local storage
    function createConfig(token) {
      return {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/timeline`, createConfig(userData.token))
      .then((response) => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.token]);



  return (
    <BodyContainer>
      <Left>
        <Title>timeline</Title>
        <NewPost/>   
        {posts.map((post) => (
          <Post
            key={post.id}            
            username={post.author}            
            siteUrl={post.siteUrl}
            title={post.title}
            description={post.description}
            userImg={post.pictureUrl}
            imageUrl={post.imageUrl}            
            likes={post.likes} 
            lastTwoUsersLiked={post.users}   
            metaDescription={post.metaDescription}        
          />
        ))}

        



        
         
        
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
  

    @media (max-width: 937px) {
        flex-direction: column;
        align-items: center;
    }
`;
const Left = styled.div`
  width: 100%;
  max-width: 611px; 
`;