import styled from "styled-components";

export default function Body() {
  return (
    <BodyContainer>
      <Left>
        <Title>timeline</Title>
        <NewPost />
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

const NewPost = styled.div`
  width: 100%;  
  max-width: 611px;
  height: 209px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;

  @media (max-width: 937px) {
        border-radius: 0;
    }
`;

const Post = styled.div`
  width: 100%;
  height: 100%;
  max-width: 611px;
  max-height: 276px;
  background: #171717;
  border-radius: 16px;
  margin: 29px 0;

  @media (max-width: 937px) {
        border-radius: 0;
    }
`;
