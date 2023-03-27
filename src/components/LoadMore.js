import React from "react";
import styled from "styled-components";

function LoadMore(props) {
  return <Button data-test="load-btn" onClick={props.handleClick}> {props.n} new posts, load more!</Button>;
}

export default LoadMore;

const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  max-width: 611px;
  height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: none;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;

  :hover{
    cursor: pointer;
    background-color: #166fe5;
  }
`;
