import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Post(post) {
  const [like, setLike] = useState(false);
  const { userData } = useContext(UserContext);
  const { id,
    username,
    siteUrl,
    title,
    description,
    userImg,
    imageUrl,
    likes,
    lastTwoUsersLiked,
    metaDescription } = post
  // Like dado?
  async function darLike() {
    // send a PUT request to update the like status on the server
    await axios.post(`${process.env.REACT_APP_API_URL}/timeline/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    });
    setLike(!like);
    
  }
  return (
    <PostContainer>
      <InfoSection>
        <UserImg src={userImg} />
        <Likes>
          {(!like) ? <AiOutlineHeart onClick={darLike} /> : <AiFillHeart style={{ color: "red" }} onClick={darLike} />}
          {likes}
        </Likes>
      </InfoSection>
      <ContentSection>
        <Author>{username}</Author>
        <Description>{description}</Description>
        <a href={siteUrl} target="_blank" rel="noopener noreferrer">
          <Content>
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