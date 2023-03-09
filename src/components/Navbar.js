import styled from "styled-components";
import { useState } from "react";
import Searchbar from "./Searchbar";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <NavBarContainer>
      <Title>linkr</Title>
      <Searchbar/>
      <UserContainer>
        <ion-icon
          onClick={toggleDropdown}
          name={!isDropdownOpen ? "chevron-down-outline" : "chevron-up-outline"}
        />
        <UserImg src="https://www.w3schools.com/howto/img_avatar.png" />
      </UserContainer>
      {isDropdownOpen && (
        <Dropdown>
          <p>Log Out</p>
        </Dropdown>
      )}
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  width: 100vw;
  height: 72px;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 28px;
  padding-right: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2
  
`;

const Title = styled.h1`
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 45px;
  line-height: 50px;
  letter-spacing: 0.05em;
  color: #ffffff;
`;

const UserImg = styled.img`
  width: 53px;
  height: 53px;
  border-radius: 50%;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;

  ion-icon {
    color: white;
    font-size: 30px;
    margin-right: 10px;
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out;
  }

  ion-icon:hover {
    cursor: pointer;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 72px;
  right: -15px;
  width: 150px;
  height: 47px;
  background-color: #151515;
  border-radius: 0px 0px 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }
`;
