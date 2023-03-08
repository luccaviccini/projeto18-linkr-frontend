import styled from "styled-components";
import { useState , useContext} from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";


export default function Navbar() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const[email,setemail]=useState('')
  const[senha,setsenha]=useState('')
  const[info,setinfo]=useState(null)

  function logar (){
  
    const logando = axios.post("http://localhost:5000/sign-in",
    {
      email: email,
      password: senha
    }
    )
    logando.then(respondeu)
    logando.catch((response)=>alert(response.data.message))
    
   
  }

  function respondeu(response){
  
    setUser(response.data.token)
    navigate("/home")
     
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
          <Botao>
            <button data-test="login-btn" onClick={logar} >Log In</button>
          </Botao>
          <Link  data-test="sign-up-link" to="/sign-up">
            <Cadastro>First time? Create an account!</Cadastro>
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




