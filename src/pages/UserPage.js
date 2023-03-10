import styled from "styled-components";
import Navbar from "../components/Navbar.js";
import BodyUserPage from "../components/BodyUserPage.js";

export default function UserPage() {
  return (
    <Container>
      <Navbar />
      <BodyUserPage />
    </Container>
  );
}

const Container = styled.div`
  min-width: 100%;
  display: flex;
`;