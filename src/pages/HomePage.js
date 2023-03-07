//import styled from "styled-components";
import { BallTriangle as LoadingAnimation } from "react-loader-spinner";

export default function HomePage(){
    return (
        <div>
            <h1>Home Page</h1>
            <LoadingAnimation
                    height={70}
                    width={70}
                    radius={5}
                    color="#000"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle=""
                    visible={true}
                />
        </div>

        
        
        
         
    );
}