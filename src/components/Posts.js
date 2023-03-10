import styled from "styled-components";
import POst from "./InfoPost"
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

export default function Post() {
  const [like, setLike] = useState(false);
  const [numLikePost, setNumLikePost] = useState(0);
  const [edit, setEdit] = useState(false);
  const [delet, setDelet] = useState(false);
  const {User} = useContext(UserContext);
  // Like dado?
  async function darLike(){
    //const tokenDoUsuario = User.token;
    //await axios.put('', {header:{ Autorization: "Bearer "+tokenDoUsuario}})
    //.catch((err) => {console.log(err)});
    //await axios.get('') // pegar número de likes do post do servidor
    //.then((response) => {setNumLikePost(response.data)}); //verificar qual Key para os valor de likes
    setLike(!like)
  }
  async function editPost(){

  }
  async function deletePost(){

  }

  return (
    <PostContainer>
      <EditDelete>
        <AiOutlineEdit onClick={editPost}/>
        <AiOutlineDelete onCanPlay={deletePost}/>
      </EditDelete>
      <POst 
      numLikePost={numLikePost} 
      User={User}
      darLike={darLike}
      like={like}/>
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
  position: relative;
`;

const EditDelete = styled.div`
  color: white;
  position: absolute;
  top: 10px;
  right: 15px;
  width: 60px;
  display: flex;
  justify-content: space-around;
`