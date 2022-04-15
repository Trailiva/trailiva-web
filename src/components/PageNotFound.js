import React from 'react';
import Navbar from "./Navbar";
import PageNotFoundImage from "../images/404.png";
import ClickableButton from "./ClickableButton"

const PageNotFound = () => {

    const pageNotFoundStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        flexDirection: "column",
        textAlign: "center"
    }

    return (
        <>
            <Navbar path="register" text="Create Account"/>
            <div style={pageNotFoundStyle}>
                <img src={PageNotFoundImage} alt="404 Icon" style={{width: "600px"}}/>
                <ClickableButton text="Go Back Home" to="/"/>
            </div>
        </>
    );
};

export default PageNotFound