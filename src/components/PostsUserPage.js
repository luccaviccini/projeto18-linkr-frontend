import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function PostUserSearched({author, userImg, userId, key, description, postTitle, postSummary, linkImage, postLink}) {
  const [like, setLike] = useState(false);
  const [numLikePost, setNumLikePost] = useState(0);
  const {userData} = useContext(UserContext);
  // Like dado?
  async function darLike(){
    //const tokenDoUsuario = User.token;
    //await axios.put('', {header:{ Autorization: "Bearer "+tokenDoUsuario}})
    //.catch((err) => {console.log(err)});
    //await axios.get('') // pegar número de likes do post do servidor
    //.then((response) => {setNumLikePost(response.data)}); //verificar qual Key para os valor de likes
    setLike(!like)
  }

  return (
    <PostContainer>
      <InfoSection>
        <UserImg src={userImg} alt='profile'/>
        <Likes>
          {(!like) ? <AiOutlineHeart onClick={darLike}/> : <AiFillHeart style={{color:"red"}} onClick={darLike}/>}
          {numLikePost}
        </Likes>
      </InfoSection>
      <ContentSection>
        <Author>{author}</Author>
        <Description>{description}</Description>
        <Content>
          <TextContent>
            <PostTitle>
              {postTitle}
            </PostTitle>
            <PostSummary>
              {postSummary}
            </PostSummary>
            <PostLink>
              {postLink}
            </PostLink>
          </TextContent>
          <LinkImage>
            <img src={linkImage} />
          </LinkImage>
        </Content>
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
  justify-content: space-around;
  @media (max-width: 937px) {
    border-radius: 0;
    justify-content: center;
  }
`;

const ContentSection = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const LinkImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  img{
    width: 153.44px;
    height: 155px;
    background: url(image.png);
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
  max-width: 503px;
  max-height: 155px;
  width: 100%;
  height: 100%;
  background: #171717;
  border: 1px solid #4D4D4D;
  border-radius: 11px;

  @media (max-width: 937px) {
    border-radius: 0;
  }
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