import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext.js"

export default function HashtagBox() {
  const [data, setData] = useState([]);

  const { userData } = useContext(UserContext);
  const token = userData.token;

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/hashtag`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, config)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  }, [token]);

  return (
    <Box data-test="trending">
      <Title>trending</Title>
      <Diviser />
      {data?.map((hashtag,i) => (
        <StyledLink data-test="hashtag" key={i} to={`/hashtag/${hashtag}`}># {hashtag}</StyledLink>
      ))}
    </Box>
  );
}

export const Box = styled.div`
  height: 406px;
  width: 301px;
  border-radius: 16px;
  background-color: #171717;
  margin-top: 105px;
  @media (max-width:900px){
       display: none;
    }
`;

export const Title = styled.h1`
  font-size: 27px;
  color: #ffffff;
  font-family: "Oswald", sans-serif;
  margin: 20px;
`;

export const Diviser = styled.div`
    width: 100%;
    height: 1px;
    background-color: #484848;
    margin-bottom: 20px;
`

export const StyledLink = styled.a`
    text-decoration: none;
    color: #ffffff;
    font-size: 19px;
    margin: 10px 20px;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    display: flex;
`