import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart , AiFillDelete} from 'react-icons/ai'
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from 'react-tooltip';
import Moodal from "./Modal/modal.js";
import { TiPencil } from "react-icons/ti";

export default function Post(post) {
  const {updatePosts, setUpdatePosts} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(post.text)
  const [clicado, setClicado] = useState(false);
  const [desabilitado, setDesabilitado] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { userData } = useContext(UserContext);
  const [link, setLink] = useState("");
  const [comment, setComment] = useState("");
  const user = userData.username
  const { id,
    userId,
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
  const [postLiked, setPostLiked] = useState(false);

  

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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const navigate = useNavigate();

  function toggleModal(e) {
    setShowDeleteModal(!showDeleteModal)
}
function toggleModal2(e) {
  setClicado(!clicado)
}
function handleSubmit() {
  setLoading(true);
  function createConfig(token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  const body = {
   
    "description": `${comment}`,
  };

 

  axios
    .put(
      `${process.env.REACT_APP_API_URL}/timeline/${post.id}`,
      body,
      createConfig(userData.token)
    )
    .then((response) => {
      setLoading(false);
      console.log(response);
      setLink("");
      setComment("");
      setUpdatePosts(!updatePosts)
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      alert("There was an error publishing your link");
    });

  //consolelog
  console.log("aqui eh o body: ", body);
  
}

  async function deletePublish() {
    setLoading(true)
    await axios.delete(`${process.env.REACT_APP_API_URL}/timeline/${post.id}`, { headers: { 'Authorization': `Bearer ${userData.token}` } })
    .then((res) => { setLoading(false); setShowDeleteModal(!showDeleteModal); post.atualiza() })
    .catch((res) => { window.location.reload(); setShowDeleteModal(!showDeleteModal); });
   

}

  function goToProfile(id) {

    navigate(`/user/${id}`);
    
  }

  console.log(lastTwoUsersLiked)

  if(username === userData.username){
    return (
      <>
   
      <PostContainer data-test="post">
        <InfoSection>
          <UserImg src={userImg} />
          <Likes>
            {(!postLiked) ? <AiOutlineHeart onClick={darLike} /> : <AiFillHeart style={{ color: "red" }} onClick={darLike} />}
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
          clicado &&
          <Moodal clicado={clicado} >
                  
                  <ModalContainer loading={loading}>
                      <TitleModal>Post Edit</TitleModal>
                      <NewPostContainer data-test="publish-box">
        <CurrentUserComment
          value={comment}
          type="text"
          placeholder="Awesome article about #javascript"
          disabled={loading}
          onChange={(e) => setComment(e.target.value)}
          data-test="description"
        />
       
  
    </NewPostContainer>
                      <div>
                          <ButtonCancel onClick={toggleModal2} data-test="cancel">Cancel</ButtonCancel>
                          <ButtonConfirm  onClick={() => handleSubmit()} data-test="confirm">Confirm Edit</ButtonConfirm >
                      </div>
                  </ModalContainer>
  
              </Moodal>
      
        }
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

  }else{
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
            {postLiked ? likes + 1 : likes}
          </Likes>
  
  
        </InfoSection>
        <ContentSection>
          <Author data-test="username" onClick={() => goToProfile(userId)}>{username}</Author>
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
  
}
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
    // fit to container whole image
    object-fit: cover;    
  }
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
 
  ;

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

  :hover{
    cursor: pointer;
  }
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

const NewPostContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
  width: 100%;
  max-width: 611px;
  height: 209px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;
  margin-bottom: 10px;

  @media (max-width: 937px) {
    border-radius: 0;
    padding: 0 18px;
  }
`;



const NewPostTitle = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #707070;
  margin-bottom: 10px;
`;

const LinkInput = styled.input`
  width: 100%;
  max-width: 503px;
  height: 30px;
  margin-bottom: 5px;
  background: #efefef;
  border-radius: 5px;
  border: none;
  padding-left: 10px;

  &::placeholder {
    margin: 0;
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
  }
`;

const CurrentUserComment = styled.input`
  width: 100%;
  max-width: 502px;
  height: 66px;
  border-radius: 5px;
  background: #efefef;
  border: none;
  padding-left: 10px;
  padding-bottom: 28px; /* change this value to adjust the position */
  text-indent: 0px;
  overflow-x: hidden;
  &::placeholder {
    position: absolute;
    top: 10px;
    left: 10px;
    margin: 0;
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
  }
`;

const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

const SubmitButton = styled.button`
  width: 112px;
  height: 31px;
  background: #1877f2;
  border-radius: 5px;
  position: absolute;
  bottom: 0px;
  right: 12px;
  margin-bottom: 10px;
  margin-right: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  &:hover {
    cursor: ${(props) => (props.loading ? "not-allowed" : "pointer")};
    background-color: #0f5ed6;
  }
`;
