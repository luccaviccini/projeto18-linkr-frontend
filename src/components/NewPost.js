import styled from "styled-components";

export default function NewPost() {
  return (
    <NewPostContainer>
      <CurrentUserImg src="https://www.w3schools.com/howto/img_avatar.png" />
      <RightSideContainer>
        <NewPostTitle>What are you going to share today?</NewPostTitle>
        <LinkInput placeholder="http://" />
        <CurrentUserComment placeholder="Awesome article about #javascript" />
        <SubmitButton>Publish</SubmitButton>
      </RightSideContainer>
    </NewPostContainer>
  );
}

const NewPostContainer = styled.div`
  width: 100%;
  max-width: 611px;
  height: 209px;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  display: flex;

  @media (max-width: 937px) {
    border-radius: 0;
    padding: 0 18px;
  }
`;

const CurrentUserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 16px 18px;

    @media (max-width: 937px) {
    display: none;
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
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
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
 
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: #0f5ed6;
    }
`;
