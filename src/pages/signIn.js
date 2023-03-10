import styled from "styled-components";
import { useState , useContext} from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
//process.env.REACT_APP_API_URL

export default function Navbar() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const[email,setemail]=useState('')
  const[senha,setsenha]=useState('')
  const[info,setinfo]=useState(null)
  const[truefalse,settruefalse]=useState(false)

  const URL = "http://localhost:5000";

  function logar (){
    settruefalse(true)
    if(email !== "" && senha!==""){
    const logando = axios.post(`${URL}/sign-in`,
    {
      email: email,
      password: senha
    }
    )
    logando.then(respondeu)
    logando.catch((response)=>(response == "AxiosError: Request failed with status code 401")? alert("email ou senha incorretos"):(response == "AxiosError: Request failed with status code 422")?alert("Preencha todos os campos!"):"")
    
   
  }else{
    alert("Preencha todos os campos !")
  }
  }


  function respondeu(response){
    localStorage.setItem('token',response.data)
    setUser(response.data)
    navigate("/timeline")
     settruefalse(false)
  }
  
 

  return (
    <NavBarContainer>
      <Title>
        <Box>
        <H1>linkr</H1>
        <H2>save, share and discover
the best links on the web</H2>
      </Box>  
      </Title>
      <Sigin>
          <Input>
            <input type="email" data-test="email" onChange={event => setemail(event.target.value)} placeholder="e-mail"></input>
          </Input>
          <Input>
            <input type="password" data-test="password" onChange={event => setsenha(event.target.value)} placeholder="password"></input>
          </Input>
          <Botao>
            <button disabled={truefalse} data-test="login-btn" onClick={logar} >Log In</button>
          </Botao>
          <Link  data-test="sign-up-link" to="/sign-up">
            <Cadastro>First time? Create an account!</Cadastro>
          </Link>
      </Sigin>
      
    </NavBarContainer>
  );
}

const Box = styled.div`

`

const Sigin = styled.div`
 height: 100vh;
 width: 40vw;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: red;
  height: 100vh;
 width: 100vw;
`;

const Title = styled.div`
 height: 100vh;
 width: 70vw;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
left: 0;
background-color: #151515;
  font-family: "Passion One";
  font-style: normal;
  font-weight: 700;
  font-size: 60px;

  color: #ffffff;

`;

const H1 = styled.div`
font-size: 106px;
line-height: 116px;
letter-spacing: 0.05em;
`
const H2 = styled.div`
 width: 442px;
 line-height: 63px;
    font-size: 43px;
`




