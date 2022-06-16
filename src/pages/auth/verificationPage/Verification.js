import React, {useEffect, useState} from 'react';
import Navbar from "../../../components/Navbar";
import "./verification.css";
import VerificationIcon from "../../../images/verify.svg";
import {Link, useNavigate, useParams} from "react-router-dom";
import ErrorIcon from "../../../images/error.svg"
import {handleTokenVerification} from "../../../services/authService";

const Verification = () => {
    const {token} = useParams();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const verifyUser = async () => {
        try {
            const res = await handleTokenVerification(token);
            setSuccessful(true);
            setMessage(res.data.message)
        } catch (err) {
            console.log('err', err);
            setSuccessful(false);
            navigate("/loginHandler")
        }
    }

    useEffect(() => {
        verifyUser();
    }, [token])


    return (
        <>
            <Navbar path="/login" text="Login"/>
            <header className="verification_header">
                <img src={successful ? VerificationIcon : ErrorIcon} alt="verification-icon"/>
                <h3>{message}</h3>
                {
                    successful ? <p>Your account is activated click
                            <Link to="/login" style={{color: "#3754DB", fontWeight: 600}}>here</Link>
                        </p>
                        :
                        <p>Error occurred while trying to verify account click
                            <Link to="/" style={{color: "#3754DB", fontWeight: 600}}>here</Link>
                        </p>
                }
            </header>
        </>
    );
};

export default Verification;