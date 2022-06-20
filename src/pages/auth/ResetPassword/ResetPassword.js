import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
import {Alert} from "@mui/material";
import FormControl from "../../../components/FormControl";
import {registrationOption} from "../../../utils/formValidation";
import AuthButton from "../../../components/AuthButton";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {handleResetPassword} from "../../../services/authService";

const ResetPassword = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [isSuccessFul, setIsSuccessFul] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorDate, setErrorData] = useState("");
    const navigate = useNavigate();

    const resetPassword = async (data) => {
        setLoading(true)
        try{
            const res = await handleResetPassword(data);
            setLoading(false);
            setIsSuccessFul(res.data.successful);
            navigate("/loginHandler");
        }catch (err) {
            setLoading(false);
            setIsSuccessFul(false);
            setErrorData(err);
            console.log('err', err);
            navigate("/loginHandler");
        }
        reset({
            email: "",
            oldPassword: "",
            password: ""
        })
    };

    const handleError = (errors) => console.log(errors);

    return (
        <>
            <Navbar path="/register" text="Create Account"/>
            <div className="form-container">
                {!isSuccessFul &&
                    <Alert variant="filled" severity="error" style={{marginBottom: "1rem"}}>{errorDate}!</Alert>}
                <div className="form-header">
                    <h2>Reset Password</h2>
                </div>

                <form onSubmit={handleSubmit(resetPassword, handleError)} noValidate>

                    <FormControl
                        label="Enter email address"
                        name="email"
                        placeholder="example@gmail.com"
                        visibility={false}
                        useForm_register_return={register("email", registrationOption.email)}
                        errors={errors}
                    />

                    <FormControl
                        label="Enter your old password"
                        name="password"
                        placeholder="Enter your password"
                        visibility={true}
                        useForm_register_return={register("oldPassword", registrationOption.password)}
                        errors={errors}
                    />


                    <FormControl
                        label="Enter a your new password"
                        name="password"
                        placeholder="Enter your password"
                        visibility={true}
                        useForm_register_return={register("password", registrationOption.password)}
                        errors={errors}
                    />

                    <AuthButton disabled={loading} text="Reset Password" loadingText="Loading..."/>
                </form>
            </div>
        </>)};

export default ResetPassword;