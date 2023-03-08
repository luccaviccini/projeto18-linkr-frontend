import styled from "styled-components";
import { useState , useContext} from "react";
import { Link , useNavigate} from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";

export default function Navbar() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const[info,setinfo]=useState(null)
  const[email,setemail]=useState('')
  const[senha,setsenha]=useState('')
  const[username,setusername]=useState('')
  const[pictureurl,setpictureurl]=useState('')

  function Cadastrar(){
    const cadastro = axios.post("http://localhost:5000/sign-up",
    {
        
        email: email,
        password: senha,
        username: username,
        pictureUrl: pictureurl,
        
    }
    )
    cadastro.then(deucerto)
}

function deucerto(response){
    setinfo(response.data)
    navigate("/")
}


  return (
    <NavBarContainer>
      <Title>
        <h1>linkr</h1>
        <h2>save, share and discover
the best links on the web</h2>
      </Title>
      <Sigin>
          <Input>
            <input data-test="email" onChange={event => setemail(event.target.value)} placeholder="e-mail"></input>
          </Input>
          <Input>
            <input data-test="password" onChange={event => setsenha(event.target.value)} placeholder="password"></input>
          </Input>
          <Input>
            <input data-test="username" onChange={event => setusername(event.target.value)} placeholder="username"></input>
          </Input>
          <Input>
            <input data-test="picture-url" onChange={event => setpictureurl(event.target.value)} placeholder="picture url"></input>
          </Input>
          <Botao>
            <button data-test="sign-up-btn" onClick={Cadastrar}>Sign Up</button>
          </Botao>
          <Link  data-test="login-link" to="/">
            <Cadastro>Switch back to log in</Cadastro>
          </Link>
      </Sigin>
      
    </NavBarContainer>
  );
}

const Sigin = styled.div`
position: absolute;
right: 0;
 width: 40vw;
height: 100vw;
 display:flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    background-color: gray;
`
const Cadastro = styled.div`
font-family: 'Raleway', sans-serif;
font-size: 15px;
font-weight: 700;
color: white;
`;
const Input = styled.div`
margin-bottom: 7px;
  input {
    box-sizing: border-box;
    padding-left: 10px;
    font-family: 'Raleway', sans-serif;
font-size: 15px;
font-weight: 700;
    margin-bottom:5px ;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    width: 303px;
    height: 45px;
  }
`;
const Botao = styled.div`
margin-bottom: 30px;
  button {
    border-radius: 5px;
    font-family: 'Raleway', sans-serif;
    font-size:20px;
    font-weight: 700;
    margin-bottom:5px ;
    border: none;
    width: 303px;
    height: 45px;
    background-color:#1877F2;
;
;
    color: white;
  }
`;

const NavBarContainer = styled.div`

  width: 100vw;
  height: 100vw;
 
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 28px;
  padding-right: 20px;
  position: relative;
`;

const Title = styled.h1`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 70vw;
height: 100%;
position: absolute;
left: 0;
background-color: #151515;
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 60px;
  line-height: 50px;
  letter-spacing: 0.05em;
  color: #ffffff;
  h1{
    font-size: 106px;
  }
  h2{
    width: 442px;
    font-size: 43px;
  }
`;




