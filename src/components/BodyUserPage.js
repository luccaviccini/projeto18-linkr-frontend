import styled from "styled-components";
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import PostUserSearched from "./PostsUserPage";
import Trending from "./Trending.js";

export default function BodyUserPage() {
  const [userDataBank, setUserDataBank] = useState();
  const { userData } = useContext(UserContext);

  let { id } = useParams();

 

  const config ={
    headers:{
      Authorization: `Bearer ${userData.token}` 
    }
  }

  useEffect(() => {
    getPosts();
  }, [id]);

  function getPosts() {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`,config);

    promise
      .then((res) => {
        console.log(res.data);
        setUserDataBank(res.data);
      })
      .catch(error =>console.log(error.response.data))
  }

  if (!userDataBank) {
    return <div>Loading...</div>
  }


  

  return (
    <BodyContainer>
      <Left>
        <Head>
          <div>
            <img src={userDataBank.pictureUrl} alt='perfil'></img>
            <h1>{userDataBank.username}'s posts</h1>
          </div> 
        </Head> 
        {userDataBank.posts && userDataBank.posts.length === 0?<p>Nothing yet</p>: 
          userDataBank.posts.map((post, index) => (
            <PostUserSearched
              data-test="post" 
              author={userDataBank.username} // pass username as prop
              userImg={userDataBank.pictureUrl} 
              userId={id} 
              key={index}
              description={post.description}
              postTitle={post.title}
              postSummary={post.linkDescription}
              linkImage={post.imageUrl} 
              postLink={post.siteUrl}
            />      
          ))}     
      </Left>
      <Trending />
    </BodyContainer>
  );
}

const Head = styled.div` 
    width: 930px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 50px;
    margin-bottom: 40px;
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    h1{
        font-family: 'Oswald';
        font-weight: 700;
        font-size:45px;
        color:#fff;
    }
    img{
    border-radius: 26.5px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin: 15px;
    }

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