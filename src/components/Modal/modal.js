
import styled from "styled-components";
import { fadeIn } from "../../styles/animations/fadeInOut.js";
import { scaleUp } from "../../styles/animations/scales.js";

export default function Moodal(props) {
    return (
        <Wrapper
            onClick={() => {props.setShowModal(false)}}
        >
            <StyledModal onClick={e => e.stopPropagation()}>
                <div>{props.children}</div>
            </StyledModal>
        </Wrapper>
    )
}



const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: rgba(255,255,255,0.7);
    animation: ${fadeIn} 0.2s ease-out forwards;
`

 const StyledModal = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0;
    width: 600px;
    margin: auto;
    background: var(--light-black);
    border-radius: 50px;
    transition: 0.1s all;
    transform-origin: center;
    animation: ${scaleUp} 0.2s ease-out forwards;
    @media (max-width: 630px) {
        width: 90%;
    }
    @media (max-width: 400px) {
        > div {
            > div {   
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
        }
    }
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 40px;
        p {
            text-align: center;
            width: 60%;
            font-family: 'Lato';
            font-weight: 700;
            font-size: 2.2rem;
            color: #FFFFFF;
        }
        
        div {   
            display: flex;
            align-items: center;
            height: auto;
            button {
                margin: 0 10px;
                width: 135px;
                height: 40px;
                background: #FFF;
                border-radius: 5px;
                color: var(--regular-blue);
                font-weight: 700;
                font-size: 1.2rem;
                border: none;
                transition: 0.2s all ease-out;
                &:hover {
                    background: var(--regular-blue);
                    color: #FFF;   
                    cursor: pointer; 
                }
            }            
            button:nth-child(2) {
                background: var(--regular-blue);
                color: #FFF;
                &:hover {
                    background: var(--strong-blue);    
                    cursor: pointer;
                }
            }
        }
    }
`