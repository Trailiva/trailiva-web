import React, {useEffect, useState} from 'react';
import Navbar from "../../../components/Navbar";
import {Alert, Snackbar} from "@mui/material";
import VerificationIcon from "../../../images/verify.svg";
import ResendIcon from "../../../images/App.test.svg"
import {handleResetVerificationToken} from "../../../api/ApiUtils";
import {useNavigate} from "react-router-dom";


const ToVerify = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("Your account has been created successfully.  A verification\n" +
        "link has been sent to your registered email address.");
    const [icon, setIcon] = useState(VerificationIcon);
    const navigate = useNavigate();
    const delay = 6000

    useEffect(() => {
        let timer = setTimeout(() => setOpen(true), 1000);
        return () => {
            clearTimeout(timer);
        };
    },[])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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
            <Snackbar
                open={open}
                autoHideDuration={delay}
                key={"center center"}
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                onClose={handleClose}
            >
                <Alert severity="success" sx={{width: '100%'}}>
                    Your Account is successfully created
                </Alert>
            </Snackbar>
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