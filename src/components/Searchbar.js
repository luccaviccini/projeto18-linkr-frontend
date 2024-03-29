import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { DebounceInput } from "react-debounce-input";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import React from "react";
import UserContext from "../context/UserContext";



function Results({ name, imgProfile, userId, setIsSearching }) {
    
    const navigate = useNavigate();

    function goToProfile(id) {

        setIsSearching(false);

        navigate(`/user/${id}`);
    }

    return (
        <Result onClick={() => goToProfile(userId)}>
            <img src={imgProfile} alt='profile' />
            <p>{name}</p>
        </Result>
    )
}

export default function Searchbar(){

    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [userSearched, setUserSearched] = useState('');
    const { userData } = useContext(UserContext);
    const token = userData.token;

    const URL = "http://localhost:5000";

    const config = {
        headers: {
            "Authorization": `Bearer ${userData.token}`
        }
    }

    function handleSearch(e) {
		setUserSearched(e.target.value);
	}

	useEffect(() => {

		if (userSearched.length >= 3) {


            const promise = axios.get(`${URL}/users?value=${userSearched}`, config);
			
			promise
				.then((res) => {
					setSearchResult(res.data);
					setIsSearching(true);
                    console.log(res.data);
				})
				.catch((err) => console.log(err.response.data));
		}

		if (userSearched.length < 3) {
			setIsSearching(false);
			setSearchResult([]);
		}
	}, [userSearched, isSearching]);


    return(
        <SearchContainer>
            <Search>
                <DebounceInput
                    data-test="search" 
                    minLength={3}
                    placeholder="Search for people..."
                    debounceTimeout={300}
                    onChange={handleSearch}
                ></DebounceInput>
                <BsSearch color="#C6C6C6" size='20px'></BsSearch>
            </Search>
            <UsersContainer isSearching={isSearching}>
				{searchResult.length === 0 ? (
					<span>Sorry, there are no results for this search.</span>
				) : (
                    searchResult.map((e, index) => (<Results
                        data-test="user-search"  
                        name={e.username} 
                        imgProfile={e.pictureUrl} 
                        userId={e.id} 
                        key={index} 
						setIsSearching={setIsSearching}
                        />))
				)}
			</UsersContainer>
        </SearchContainer>
    );

 }





const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 560px;
    height: 45px;
    background-color: white;
    border-radius: 8px;

    @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (min-width: 2000px) {
    width: calc(100% - 64px); /* subtract the total padding of 32px on both sides */
    max-width: 560px;
  }

`;

const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;


    input{
        width: 100%;
        /*width: 540px;*/
        width: 100%;
        height: 45px;
        background-color: #FFFFFF;
        border: none;
        border-radius: 8px;
        :focus{
            outline: none;
        }
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: left;
        color: #C6C6C6;
        }

`;

const UsersContainer = styled.section`
	display: ${(props) => (props.isSearching ? 'flex' : 'none')};
	flex-direction: column;
    
	gap: 16px;
	z-index: -1;
	width: 100%;
	height: auto;
	padding: 30px 0 23px 0;
	background-color: #e7e7e7;
    width: 560px;

	border-radius: 8px;
	span {
		font-size: 20px;
		font-weight: 300;
		color: #707070;
	}
`;

const Result = styled.div`
    display: flex;
    align-items: center;
    
    height: 60px;
    padding: 0 10px;
    border-radius: 10px;
    img{
        height: 39px;
        width: 39px;   
        border-radius: 50%;
        object-fit: cover;
        margin:10px
    }
    p{
        font-family: 'Lato';
        font-size:19px;
        line-height: 23px;
    }

    :hover{
        cursor: pointer;
        background-color: lightgray;
    }
    `;