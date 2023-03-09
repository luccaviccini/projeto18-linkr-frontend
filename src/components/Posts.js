import styled from "styled-components";

export default function Post() {
  return (
    <PostContainer>
      <UserImg src="https://www.w3schools.com/howto/img_avatar.png" />
        <PostTitle>Post Title</PostTitle>
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

  @media (max-width: 937px) {
    border-radius: 0;
  }
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 16px 18px;
`;

const PostTitle = styled.h1`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;

  color: #707070;
`;
