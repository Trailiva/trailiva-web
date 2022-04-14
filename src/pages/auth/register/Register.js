import React, {useState} from "react";
import "./register.css";
import {useForm} from "react-hook-form";
import {api} from "../../../api/api";
import Navbar from "../../../components/Navbar";
import {registrationOption} from "../../../utils/formValidation";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import {useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";


const Register = () => {

    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const [errorData, setErrorData] = useState("");
    const navigate = useNavigate();

    const handleRegistration = async (data) => {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        };

        setLoading(true);
        try {
           const response = await api.post("/auth/register", userData);
           const data = response.data;
            console.log(data);
           localStorage.setItem('email', data.email);
            navigate("/to-verify");
        } catch (error){
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

        reset({
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        })
    };

    const handleError = (errors) => console.log(errors);

    return (
        <>
            <Navbar text="Login" path="/login"/>
            <div className="form-container">
                <div className="form-header">
                    <h2>Create an Account</h2>
                    <p>It's Simple and Easy !!</p>
                </div>
                {errorData && <Alert sx={{width: '50%', textAlign: 'center'}} variant="filled" severity="error">
                    {errorData}
                </Alert>}
                <form onSubmit={handleSubmit(handleRegistration, handleError)} noValidate>
                    <FormControl
                        label="Enter your first name"
                        name="firstName"
                        placeholder="John"
                        visibility={false}
                        useForm_register_return={register("firstName", registrationOption.fullName)}
                        errors={errors}
                    />

                    <FormControl
                        label="Enter your last name"
                        name="lastName"
                        placeholder="Doe"
                        visibility={false}
                        useForm_register_return={register("lastName", registrationOption.fullName)}
                        errors={errors}
                    />

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

                    <AuthButton disabled={loading} text="Create Account" loadingText="Loading..."/>
                </form>
            </div>

        </>

    );
};

export default Register;
