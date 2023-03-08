import styled from "styled-components";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { BsSearch } from "react-icons/bs";

export default function Searchbar(){

    function handleChange(event) {
        console.log(event.target.value);
    }

    return(
        <SearchContainer>
            <Search>
                <DebounceInput
                    minLength={3}
                    placeholder="Search for people..."
                    debounceTimeout={300}
                    onChange={handleChange}
                />
                <BsSearch color="#C6C6C6" size='20px'></BsSearch>
            </Search>
        </SearchContainer>
    );

}

const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 560px;
    height: 45px;
    background-color: #FFFFFF;
    border-radius: 8px;
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    input{
        width: 540px;
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

