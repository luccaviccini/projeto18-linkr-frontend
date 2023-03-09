import styled from "styled-components";

export default function Trending() {
    return (
        <Sidebar>
            <h1>trending</h1>
            <Hashtags>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
                <h2>#BBB23</h2>
            </Hashtags>
        </Sidebar>
    )
}

const Sidebar = styled.div`
    width: 301px;
    height: 406px;
    background: #171717;
    border-radius: 16px;
    margin-top: 105px;
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    color:white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:flex-start;
    gap: 10px;
    h1{
        padding: 10px 20px;
    }
    @media (max-width: 937px) {
        display: none;
    }
`;

const Hashtags = styled.div`
    gap: 13px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding: 10px 20px;
    font-size: 19px;
    border: 1px solid #484848;
`