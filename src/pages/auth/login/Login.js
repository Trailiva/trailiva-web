import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
import {Alert} from "@mui/material";
import {registrationOption} from "../../../utils/formValidation";
import {useForm} from "react-hook-form";
import {api} from "../../../api/api";
import {ACCESS_TOKEN, TOKEN_EXPIRY_DATE, VERIFICATION_TOKEN} from "../../../constants";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";


const Login = () => {


    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [isSuccessFul, setIsSuccessFul] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorDate, setErrorData] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (data) => {
        const userData = {
            email: data.email,
            password: data.password
        };

        setLoading(true);

        let response;
        try {
            response = await api.post("/auth/login", userData);
            localStorage.setItem(ACCESS_TOKEN, response.data.jwtToken);
            navigate("/")
        } catch (error) {
            setLoading(false);
            if (error.response) {
                // Request made and server responded
                console.log(error.response.data);
                setErrorData(error.response.data.message);

            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                setErrorData("Server is currently down")
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                setErrorData("Internet not connected")
            }
            setTimeout(() => {
                setErrorData("");
            }, [5000])
        }

        setLoading(false);

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
            <Navbar text="Create Account" path="/"/>

            <div className="form-container">
                {!isSuccessFul &&
                    <Alert variant="filled" severity="error" style={{marginBottom: "1rem"}}>{errorDate}!</Alert>}
                <div className="form-header">
                    <h2>Welcome Back Login</h2>
                </div>

                <form onSubmit={handleSubmit(handleLogin, handleError)} noValidate>

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