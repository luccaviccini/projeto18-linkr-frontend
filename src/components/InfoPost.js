import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
export default function POst({ numLikePost, darLike, like }) {
    return (
        <>
            <InfoSection>
                <UserImg src="https://www.w3schools.com/howto/img_avatar.png" />
                <Likes>
                    {(!like) ? <AiOutlineHeart onClick={darLike} /> : <AiFillHeart style={{ color: "red" }} onClick={darLike} />}
                    {numLikePost}
                </Likes>
            </InfoSection>
            <ContentSection>
                <Author>Autor</Author>
                <Description>Olha que legal</Description>
                <Content>
                    <TextContent>
                        <PostTitle>
                            Title
                        </PostTitle>
                        <PostSummary>
                            TEXT TEXT TEXT TEXT TEXT TEXT
                        </PostSummary>
                        <PostLink>
                            https://www.youtube.com/watch?v=dQw4w9WgXcQ
                        </PostLink>
                    </TextContent>
                    <LinkImage>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" />
                    </LinkImage>
                </Content>
            </ContentSection>
        </>
    )
}

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
  max-width: 503px;
  max-height: 155px;
  width: 100%;
  height: 100%;
  background: #171717;
  border: 1px solid #4D4D4D;
  border-radius: 11px;

  @media (max-width: 937px) {
    border-radius: 0;
  }
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
const LinkImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  img{
    width: 153.44px;
    height: 155px;
    background: url(image.png);
    border-radius: 0px 12px 13px 0px;
  }
`
const ContentSection = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const PostLink = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  font-size: 11px;
  color: #CECECE;
`;