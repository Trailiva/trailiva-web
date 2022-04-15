import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
import {Alert} from "@mui/material";
import {registrationOption} from "../../../utils/formValidation";
import {useForm} from "react-hook-form";
import {api} from "../../../api/api";
import {ACCESS_TOKEN, TOKEN_EXPIRY_DATE, VERIFICATION_TOKEN} from "../../../constants";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import {Link, useNavigate} from "react-router-dom";
import {handleUserLogin} from "../../../api/ApiUtils";


const Login = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [isSuccessFul, setIsSuccessFul] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorDate, setErrorData] = useState("");
    const navigate = useNavigate();

    const login = async (data) => {
        setLoading(true);
        try {
            const res = await handleUserLogin(data);
            localStorage.setItem(ACCESS_TOKEN, res.data.jwtToken);
            navigate("/")
            setLoading(res.data.successful);
            setIsSuccessFul(true);
        }catch (err) {
            console.log("err", err);
            setLoading(false);
            setIsSuccessFul(false);
            setErrorData(err);
        }
        reset({
            email: "",
            password: ""
        })
    };

    const handleError = (errors) => console.log(errors);
    const forgetPasswordHandler = async () => {
        let response = await api.get("auth/password/reset/ohida2001@gmail.com");
        localStorage.setItem(VERIFICATION_TOKEN, response.data.token);
        localStorage.setItem(TOKEN_EXPIRY_DATE, response.data.expiry);
    }

    return (
        <>
            <Navbar text="Create Account" path="/register"/>

            <div className="form-container">
                {!isSuccessFul &&
                    <Alert variant="filled" severity="error" style={{marginBottom: "1rem"}}>{errorDate}!</Alert>}
                <div className="form-header">
                    <h2>Welcome Back Login</h2>
                </div>

                <form onSubmit={handleSubmit(login, handleError)} noValidate>

                    <FormControl
                        label="Enter email address"
                        name="email"
                        placeholder="example@gmail.com"
                        visibility={false}
                        useForm_register_return={register("email", registrationOption.email)}
                        errors={errors}
                    />

                    <FormControl
                        label="Enter a password"
                        name="password"
                        placeholder="Enter your password"
                        visibility={true}
                        useForm_register_return={register("password", registrationOption.password)}
                        errors={errors}
                    />

                    <AuthButton disabled={loading} text="Login" loadingText="Logging..."/>
                    <Link to="/forget-password" onClick={forgetPasswordHandler}>Forget password ?</Link>
                </form>
            </div>
        </>
    );
};

export default Login;