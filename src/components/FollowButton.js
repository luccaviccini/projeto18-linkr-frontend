
import React from "react";
import axios from 'axios';
import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

export default function FollowButton({followedId}){

    const { userData } = useContext(UserContext);
    const [followed, setFollowed] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [refreshButton, setRefreshButton] = useState(false);

    const config ={
        headers:{
            Authorization: `Bearer ${userData.token}` 
        }
    }

    useEffect(() => {
        
        const promise = axios.get(`${process.env.REACT_APP_API_URL}/follows/${followedId}`, config);

        promise.then((res) => {
            console.log("res useEffect?");
            console.log(res.data);
            setFollowed(res.data); 
        })
        .catch((error) => {
            console.log(error);
        });
    }, [refreshButton]);



function toggleFollow(){
    setDisabled(true);

    console.log("testando toggle");

    console.log(config);

    if(followed === 'true'){

      const promise = axios.delete(`${process.env.REACT_APP_API_URL}/follows/${followedId}`, config);

      promise.then((res) => {
          setRefreshButton(!refreshButton);
          setDisabled(false);
          setFollowed(false);
          console.log("toggle result");
          console.log(res.data);
          console.log("delete!");
        })
        .catch((err) => console.log(err));
    } else{
      const promise = axios.post(`${process.env.REACT_APP_API_URL}/follows/${followedId}`, {}, config);

      promise.then((res) => {
          setRefreshButton(!refreshButton);
          setDisabled(false);
          setFollowed(true);
          console.log("toggle result");
          console.log(res.data);
          console.log("add!");
        })
        .catch((err) => console.log(err));
    }

}

return(

  <Button 
      onClick={() => toggleFollow()}
      disabled={disabled}
      followed={followed}
  >
      { followed ? <h3>Unfollow</h3> : <h3>Follow</h3> }
  </Button>
);
}


  const Button = styled.div`
  
  width: 112px;
	height: 31px;
	border-radius: 5px;
	border: none;
	background-color: ${(props) => (props.followed ? '#FFFFFF' : '#1877F2')};
	font-size: 14px;
	font-weight: 700;
	color: ${(props) => (props.followed ? '#1877F2' : '#FFFFFF')};
	&:hover{
		cursor: pointer;
	}
  display: flex;
  justify-content: center;
  align-items: center;
  
  `;