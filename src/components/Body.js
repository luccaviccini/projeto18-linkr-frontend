import styled from "styled-components";
import Post from "./Posts.js";
import NewPost from "./NewPost.js";

export default function Body() {
  return (
    <BodyContainer>
      <Left>
        <Title>timeline</Title>
        <NewPost/>        
        <Post />
        <Post />
       
      </Left>
      <Sidebar />
    </BodyContainer>
  );
}

const Title = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  margin-bottom: 43px;

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
const Sidebar = styled.div`
  width: 301px;
  height: 406px;
  background: #171717;
  border-radius: 16px;
  margin-top: 105px;

    @media (max-width: 937px) {
        display: none;
    }
`;




