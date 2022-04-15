import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
import {Alert} from "@mui/material";
import FormControl from "../../../components/FormControl";
import {registrationOption} from "../../../utils/formValidation";
import AuthButton from "../../../components/AuthButton";
import {useForm} from "react-hook-form";
import {TOKEN_EXPIRY_DATE, VERIFICATION_TOKEN} from "../../../constants";
import {handleForgetPassword} from "../../../api/ApiUtils";
import {useNavigate} from "react-router-dom";

const ForgetPassword = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [isSuccessFul, setIsSuccessFul] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorDate, setErrorData] = useState("");
    const navigate = useNavigate();

    const forgetPassword = async (data) => {
        setLoading(true);
        try {
            const res = await handleForgetPassword(data);
            localStorage.removeItem(VERIFICATION_TOKEN);
            localStorage.removeItem(TOKEN_EXPIRY_DATE);
            setLoading(res.data.successful);
            setIsSuccessFul(res.data.successful);
        } catch (err) {
            setErrorData(err);
            navigate("/login")
            setLoading(false);
            setIsSuccessFul(false);
        }
        reset({
            email: "",
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
                    <h2>Forget Password</h2>
                </div>

                <form onSubmit={handleSubmit(forgetPassword, handleError)} noValidate>

                    <FormControl
                        label="Enter email address"
                        name="email"
                        placeholder="example@gmail.com"
                        visibility={false}
                        useForm_register_return={register("email", registrationOption.email)}
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

                    <AuthButton disabled={loading} text="Recover Account" loadingText="Loading..."/>
                </form>
            </div>
        </>
    );
};

export default ForgetPassword;