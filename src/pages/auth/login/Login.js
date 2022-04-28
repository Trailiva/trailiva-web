import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
import {registrationOption} from "../../../utils/formValidation";
import {useForm} from "react-hook-form";
import {ACCESS_TOKEN, TOKEN_EXPIRY_DATE, VERIFICATION_TOKEN} from "../../../constants";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import {Link, useNavigate} from "react-router-dom";
import {handleForgetPasswordToken, handleUserLogin} from "../../../api/ApiUtils";
import MessageAlert from "../../../components/MessageAlert";


const Login = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [isSuccessFul, setIsSuccessFul] = useState(true);
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
            return {...prevState, open: false}
        });
    };
    const login = async (data) => {
        setLoading(true);
        try {
            const res = await handleUserLogin(data);
            localStorage.setItem(ACCESS_TOKEN, res.data.jwtToken);
            setLoading(false);
            setIsSuccessFul(res.data.successful);

            if(localStorage.getItem("HAS_WORKSPACE"))
                navigate("/")
            else navigate("/create-workspace");

        } catch (err) {
            console.log("err", err)
            setLoading(false);
            setIsSuccessFul(false);
            setErrorData(err.response.data.message);
            setMessageModal(prevState => {
                return {...prevState, open: true}
            })
            navigate("/register")
        }
        reset({
            email: "",
            password: ""
        })
    };

    const handleError = (errors) => console.log(errors);
    const forgetPasswordHandler = async () => {
        try {
            let response = await handleForgetPasswordToken();
            localStorage.setItem(VERIFICATION_TOKEN, response.data.token);
            localStorage.setItem(TOKEN_EXPIRY_DATE, response.data.expiry);
            navigate("/forget-password")
        } catch (err) {
            console.log("error ==> ", err)

        }
    }

    return (
        <>
            <Navbar text="Create Account" path="/register"/>

            <div className="form-container">
                {!isSuccessFul &&
                    <MessageAlert messageModal={messageModal} onClose={handleClose} errorData={errorData}/>}
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