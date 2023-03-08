import styled from "styled-components";
import Navbar from "../components/Navbar.js";
import Body from "../components/Body.js";

export default function HomePage() {
  return (
    <Container>
      <Navbar />
      <Body />
    </Container>
  );
}

const Container = styled.div`
  min-width: 100%;
  display: flex;
`;
