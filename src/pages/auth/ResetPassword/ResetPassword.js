import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
import {Alert} from "@mui/material";
import FormControl from "../../../components/FormControl";
import {registrationOption} from "../../../utils/formValidation";
import AuthButton from "../../../components/AuthButton";
import {useForm} from "react-hook-form";
import {api} from "../../../api/api";

const ResetPassword = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [isSuccessFul, setIsSuccessFul] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorDate, setErrorData] = useState("");

    const handleForgetPassword = async (data) => {
        const userData = {
            email: data.email,
            oldPassword: data.oldPassword,
            password: data.password
        };

        setLoading(true);

        let response;
        try {
            response = await api.post(`auth/password/update`, userData);
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
        console.log(response.data);

        reset({
            email: "",
            oldPassword: "",
            password: ""
        })
    };
    const handleError = (errors) => console.log(errors);

    return (
        <>
            <Navbar path="/" text="Create Account"/>
            <div className="form-container">
                {!isSuccessFul &&
                    <Alert variant="filled" severity="error" style={{marginBottom: "1rem"}}>{errorDate}!</Alert>}
                <div className="form-header">
                    <h2>Reset Password</h2>
                </div>

                <form onSubmit={handleSubmit(handleForgetPassword, handleError)} noValidate>

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
        </>
    );
};

export default ResetPassword;