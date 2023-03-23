import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from 'react-icons/ai'
import { TiPencil } from "react-icons/ti";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import Moodal from "./Modal/modal.js";
export default function Post(post) {

  const [edit, setEdit] = useState(post.text)
  const [clicado, setClicado] = useState(false);
  const [desabilitado, setDesabilitado] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [like, setLike] = useState(false);
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
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
    await axios.post(`${process.env.REACT_APP_API_URL}/timeline/${post.id}`, {}, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    });
    setLike(!like);

  }
  function toggleModal(e) {
    setShowDeleteModal(!showDeleteModal)
}
function createConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };
}
async function deletePublish() {
    setLoading(true)
    const requisicao = axios.delete(`${process.env.REACT_APP_API_URL}/timeline/${post.id}`, { headers: { 'Authorization': `Bearer ${userData.token}` } });
    requisicao.then((res) => { setLoading(false); setShowDeleteModal(!showDeleteModal); post.atualiza() });
    requisicao.catch((res) => { alert(res.response.data); setShowDeleteModal(!showDeleteModal); });

    await axios
    .get(`${process.env.REACT_APP_API_URL}/timeline`, createConfig(userData.token))
    .then((response) => {
      post.setPosts(response.data);
      
    })
    .catch((error) => {
      console.log(error);
    });
}
if(username === userData.username){
  return (
    <>
   
    <PostContainer data-test="post">
      <InfoSection>
        <UserImg src={userImg} />
        <Likes>
          {(!like) ? <AiOutlineHeart onClick={darLike} /> : <AiFillHeart style={{ color: "red" }} onClick={darLike} />}
          {likes}
        </Likes>
      </InfoSection>
      <ContentSection>
        <TopContent>
        <Author data-test="username" >{username}</Author>
        <div>
            <TiPencilStyled onClick={() => { setDesabilitado(false); setClicado(!clicado); setEdit(post.text) }} data-test="edit-btn" />
            <AiFillDeleteStyled onClick={() => setShowDeleteModal(!showDeleteModal)} data-test="delete-btn" />
        </div>
        </TopContent>
        
        <Description data-test="description">{description}</Description>
        <a href={siteUrl} target="_blank" rel="showDeleteModaler noreferrer">
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
      {
        showDeleteModal &&
        <Moodal showDeleteModal={showDeleteModal} >
                <Loading loading={loading}>Loading...</Loading>
                <ModalContainer loading={loading}>
                    <TitleModal>Are you sure you want<br />to delete this post?</TitleModal>
                    <div>
                        <ButtonCancel onClick={toggleModal} data-test="cancel">No, go back</ButtonCancel>
                        <ButtonConfirm onClick={deletePublish} data-test="confirm">Yes, delete it</ButtonConfirm>
                    </div>
                </ModalContainer>

            </Moodal>
    
      }
      
    </>
  );
} else{
  return (
    <PostContainer data-test="post">
      <InfoSection>
        <UserImg src={userImg} />
        <Likes>
          {(!like) ? <AiOutlineHeart onClick={darLike} /> : <AiFillHeart style={{ color: "red" }} onClick={darLike} />}
          {likes}
        </Likes>
      </InfoSection>
      <ContentSection>
        <Author data-test="username" >{username}</Author>
        <Description data-test="description">{description}</Description>
        <a href={siteUrl} target="_blank" rel="showDeleteModaler noreferrer">
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
 
}

const ButtonCancel = styled.button`
    width: 134px;
    height: 37px;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #1877F2;
    margin-right: 15px;
    border: none;
`;

const ButtonConfirm = styled.button`
    width: 134px;
    height: 37px;
    background-color: #1877F2;
    border-radius: 5px;
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    color: #FFFFFF;
    border: none;
    margin-left: 15px;
`;

const TitleModal = styled.span`
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;
    margin-bottom: 40px;
`;




const Loading = styled.div`
    display: ${props => props.loading ? "flex" : "none"};
    align-items: center;
    justify-content: center;
    width: 100%;
    color: #FFFFFF;
    font-size: 30px;
    text-align: center;
`;

const ModalContainer = styled.div`
    display: ${props => !props.loading ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
`;

const TopContent= styled.div`

display: flex;
justify-content: space-between;

`;

const AiFillDeleteStyled = styled(AiFillDelete)`
    color: white;
    margin-right: 10px;
`;
const TiPencilStyled = styled(TiPencil)`
    margin-right: 10px;
    color: white;
`;


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