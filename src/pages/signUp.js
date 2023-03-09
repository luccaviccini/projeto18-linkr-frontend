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

    if(email !== "" && senha!==""&& username !== "" && pictureurl !== ""){
      const cadastro = axios.post(`${process.env.REACT_APP_API_URL}/sign-up`,
      {
          
          email: email,
          password: senha,
          username: username,
          pictureUrl: pictureurl,
          
      }
      )
      cadastro.then(deucerto)
      cadastro.catch((response)=>(response == "AxiosError: Request failed with status code 409")? alert("email já cadastrado"):(response == "AxiosError: Request failed with status code 422")?alert("Preencha todos os campos!"):"")
    }else{
      alert("preencha todos os campos !")
    }

}

function deucerto(response){
    setinfo(response.data)
    navigate("/")
}


  return (
    <NavBarContainer>
      <Box>
      <Title>
        <H1>linkr</H1>
        <H2>save, share and discover
the best links on the web</H2>
      </Title>
      </Box>
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




