import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import "react-tooltip/dist/react-tooltip.css";  
import { Tooltip } from 'react-tooltip'

export default function Post(post) {

  const { userData } = useContext(UserContext);
  const user = userData.username
  const { id,
    username,
    siteUrl,
    title,
    description,
    userImg,
    imageUrl,
    likes,
    lastTwoUsersLiked,
    usersLikes,
    metaDescription } = post
  const [like, setLike] = useState(false);
  const [postLiked, setPostLiked] = useState(usersLikes.includes(user));
  // Like dado?  
  useEffect(() => {
    setPostLiked(usersLikes.includes(user))
    console.log(usersLikes.includes(user))
  }, [likes])

  async function darLike() {
    // send a POST request to like the post on the server
    axios
      .post(`${process.env.REACT_APP_API_URL}/timeline/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      })
      .then(() => {
        setPostLiked(!postLiked)
        let liked = !postLiked 
        liked ? setLike(true) : setLike(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(lastTwoUsersLiked)
  return (
    <PostContainer data-test="post">
      <InfoSection>
        <UserImg src={userImg} />
        <Tooltip
          id="app-title"
          place="bottom"
          content={likes >= 3 ? `${lastTwoUsersLiked} e outras ${likes - 2} pessoas` : `${lastTwoUsersLiked}`}
          style={{ background: "rgba(255, 255, 255, 0.9)", color: "#000000" }}
        />
        <Likes data-tooltip-id="app-title">
        
          {(!postLiked) ? <AiOutlineHeart onClick={darLike} /> : <AiFillHeart style={{ color: "red" }} onClick={darLike} />}
          {postLiked ? likes+1 : likes}
        </Likes>
        

      </InfoSection>
      <ContentSection>
        <Author data-test="username" >{username}</Author>
        <Description data-test="description">{description}</Description>
        <a href={siteUrl} target="_blank" rel="noopener noreferrer">
          <Content data-test="link">
            <TextContent>
              <PostTitle>
                {title}
              </PostTitle>
              <PostSummary>
                {metaDescription}
              </PostSummary>
              <PostLink>
                {siteUrl}
              </PostLink>
            </TextContent>
            <LinkImage>
              <img src={imageUrl} />
            </LinkImage>
          </Content>
        </a>
      </ContentSection>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 611px;
  max-height: 276px;
  background: #171717;
  border-radius: 16px;
  margin: 29px 0;
  display: flex;
  justify-content: flex-start;
  padding-left:3%;
  @media (max-width: 937px) {
    padding-left:0;
    border-radius: 0;
    justify-content: center;
  }
  a{
    text-decoration: none;
  }
`;

const ContentSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

`
const LinkImage = styled.div`
  img{
    width: 153.44px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
  }
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const InfoSection = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  `
const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 16px 15px;
`;


const Author = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;

  color: #fff;
`;
const Likes = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:10px;
  color: #ffffff;
  :hover{
    cursor: pointer;
  }
`;
const Description = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;

  color: #B7B7B7;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 503px;
  max-height: 155px;
  width: 100%;
  height: 100%;
  background: #171717;
  border: 1px solid #4D4D4D;
  border-radius: 11px;
`;

const PostTitle = styled.h1`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  font-size: 16px;

  color: #CECECE;
`;

const PostSummary = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  font-size: 11px;
  color: #9B9595;
`;
const PostLink = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  font-size: 11px;
  color: #CECECE;
`;