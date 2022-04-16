import React, {useState} from "react";
import "./register.css";
import {useForm} from "react-hook-form";
import Navbar from "../../../components/Navbar";
import {registrationOption} from "../../../utils/formValidation";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import {useNavigate} from "react-router-dom";
import {handleUserRegistration} from "../../../api/ApiUtils";
import MessageAlert from "../../../components/MessageAlert";

const Register = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [loading, setLoading] = useState(false);
    const [errorData, setErrorData] = useState("");
    const navigate = useNavigate();
    const [messageModal, setMessageModal] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const handleClose = () => {
        setMessageModal(prevState => {
            return {...prevState, open: false }
        });
    };


    const registerUser = async (data) => {
        setLoading(true);
        try {
            const res = await handleUserRegistration(data);
            localStorage.setItem('email', res.data.email);
            navigate("/to-verify");
        } catch (err) {
            setLoading(false);
            console.log('err', err.response.data)
            setErrorData(err.response.data.message);
            setMessageModal(prevState => {
                return {...prevState, open: true}
            })
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
                {errorData && <MessageAlert messageModal={messageModal} onClose={handleClose} errorData={errorData}/>}
                <form onSubmit={handleSubmit(registerUser, handleError)} noValidate>
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

        </>)
};

export default Register;
