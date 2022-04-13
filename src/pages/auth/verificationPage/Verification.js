import React, {useEffect, useState} from 'react';
import Navbar from "../../../components/Navbar";
import "./verification.css";
import VerificationIcon from "../../../images/verify.svg";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {api} from "../../../api/api";
import ErrorIcon from "../../../images/error.svg"

const Verification = () => {
    const {token} = useParams();
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    console.log("User token ==> " + token)
    useEffect(() => {
        api.get(`/auth/registrationConfirm?token=${token}`)
            .then((res) => {
                console.log(res.data)
                setSuccessful(true);
                setMessage(res.data.message)
            }).catch(error => {
            console.log(error.response);
            console.log((error.request))
            setMessage(error.data.message)
        })
    }, [token])
    return (
        <>
            <Navbar path="/login" text="Login"/>
        <header className="verification_header">
            <img src={successful ? VerificationIcon : ErrorIcon} alt="verification-icon"/>
            <h3>{message}</h3>
            {
                successful ?  <p>Your account is activated click <Link to="/login" style={{color: "#3754DB", fontWeight: 600}}>here</Link></p>
                : <p>Error occurred while trying to verify account click <Link to="/" style={{color: "#3754DB", fontWeight: 600}}>here</Link></p>
            }
            </header>
        </>
    );
};

export default Verification;