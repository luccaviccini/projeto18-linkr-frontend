import styled from "styled-components";
import Post from "./Post.js";
import NewPost from "./NewPost.js";
import Trending from "./Trending.js"
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext.js";
import Searchbar from "./Searchbar";
import axios from "axios";
import Loading from "./Loading.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCallback } from "react";
import LoadMore from "./LoadMore.js";
import useInterval from "use-interval";

export default function Body() {
  const { userData, updatePosts } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [n, setN] = useState(0);
  



  useEffect(() => {
    async function getTimeline(token, page) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/timeline?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setLoading(false);
  
        if (page === 1) {
          setPosts(response.data);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
        }
  
        if (response.data.length < 10) { // update hasMore state if less than 10 posts are returned
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page"
        );
      }
    }
  
    if (userData.token) {
      getTimeline(userData.token, page);
    }
  }, [userData.token, page]);
  


  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleClick = () => {
    // reload screen
    window.location.reload();
  };

  async function fetchNewPost() {
    const lastPostId = posts[0].id;
    console.log(lastPostId);
    try{
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/timeline`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      
      const newPosts = response.data.filter((post) => post.id > lastPostId);
      console.log("newPosts")
      console.log(newPosts);
      if(newPosts.length > 0){
        setN(newPosts.length);
      }
    }

    catch (error) {
      console.log(error);
      alert(
        "An error occurred while trying to fetch the posts, please refresh the page"
      );
    }
    
    
  }

  useInterval (fetchNewPost, 5000);



  return (
    <BodyContainer>
      <Left>
        <SearchContainer>
          <Searchbar />
        </SearchContainer>
        <Title>timeline</Title>
        <NewPost />
        {n > 0 && <LoadMore n={n} handleClick={handleClick} />}
        {!posts.length && !loading ? (
          <h3>"There are no posts yet"</h3>
        ) : (
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={
              <LoadingContainer>
                Loading <Loading />
              </LoadingContainer>
            }
            endMessage={<LoadingContainer>
              No more posts
            </LoadingContainer>}
          >
            {posts.map((post) => (
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
            ))}
          </InfiniteScroll>
        )}
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