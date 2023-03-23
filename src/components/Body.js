import styled from "styled-components";
import Post from "./Post.js";
import NewPost from "./NewPost.js";
import Trending from "./Trending.js"
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext.js";
import axios from "axios";
import Loading from "./Loading.js";

export default function Body() {
  const { userData } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [ loading, setLoading ] = useState(true)

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
        setPosts(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.token]);

  function atualiza(){

  }


  return (
    <BodyContainer>
      <Left>
        <Title>timeline</Title>
        <NewPost setPosts={setPosts}/>
        {!posts ? <h3>"There are no posts yet"</h3> : 
        posts.length > 0 ?
          posts.map((post) => (
            <Post
            setPosts={setPosts}
              key={post.id}
              id={post.id}
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
          )) :
          <Loading/>
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