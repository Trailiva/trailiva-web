import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
import VerificationIcon from "../../../images/verify.svg";
import ResendIcon from "../../../images/App.test.svg"
import {useNavigate} from "react-router-dom";
import {handleResetVerificationToken} from "../../../services/authService";


const ToVerify = () => {
    const [message, setMessage] = useState("Your account has been created successfully.  A verification\n" +
        "link has been sent to your registered email address.");
    const [icon, setIcon] = useState(VerificationIcon);
    const navigate = useNavigate();


    const handleResendToken = async () => {
        try {
            const res = await handleResetVerificationToken();
            console.log(res.data);
            setIcon(ResendIcon);
            setMessage(res.data.message);
        } catch (err) {
            console.log(err.request);
            console.log(err.response);
            navigate("/login")
        }
    }

    return (
        <>
            <Navbar path="/login" text="Login"/>
            <header className="verification_header">
                <img src={icon} alt="verification-icon"/>
                <h3>Check your Email to Verify
                    <br/> your Account</h3>
                <p>{message}</p>
                <button className="token-btn" type="button" onClick={handleResendToken}>Resend Token</button>
            </header>
        </>
    );
};

export default ToVerify;