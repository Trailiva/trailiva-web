import React, {useEffect, useState} from 'react';
import Navbar from "../../../components/Navbar";
import "./verification.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import ErrorIcon from "../../../images/error.svg"
import {handleTokenVerification} from "../../../services/authService";

const Verification = () => {
    const {token} = useParams();
    const [successful, setSuccessful] = useState(false);
    const navigate = useNavigate();

    const verifyUser = async () => {
        localStorage.removeItem("firstName")
        try {
            await handleTokenVerification(token);
            setSuccessful(true);
            navigate("/login")
        } catch (err) {
            setSuccessful(false)
        }
    }

    useEffect(() => {
        verifyUser();
    }, [token])


    return (
        !successful && <>
            <Navbar path="/login" text="Login"/>
            <header className="verification_header">
                <img src={ErrorIcon} alt="verification-icon"/>
                <p>Error occurred while trying to verify account click
                    <Link to="/" style={{color: "#3754DB", fontWeight: 600}}> here</Link> to resend verification token.
                </p>

            </header>
        </>
    );
};

export default Verification;