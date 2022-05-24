import "./register.css";
import Navbar from "../../../components/Navbar";
import {registrationOption} from "../../../utils/formValidation";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import {registerHandler, handleReset} from "../../../slices/authSlice";
import {useEffect} from "react";
import {toast} from "react-toastify";


const Register = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoading, isError, isSuccess, message, user} = useSelector((state) => state.auth);


    const registerUser = (data) => {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        };
        dispatch(registerHandler(userData))
       if (isSuccess){
           reset({
               firstName: "",
               lastName: "",
               email: "",
               password: ""
           })
       }
    };

    useEffect(()=> {
        if (isError)
            toast.error(message);

        if (isSuccess || user)
            navigate("/to-verify")

        dispatch(handleReset())
    }, [user, isSuccess, navigate, dispatch, message, isError])


    const handleError = (errors) => console.log(errors);

    return (
        <>
            <Navbar text="Login" path="/login"/>
            <div className="form-container">
                <div className="form-header">
                    <h2>Create an Account</h2>
                    <p>It's Simple and Easy !!</p>
                </div>
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

                    <AuthButton disabled={isLoading} text="Create Account" loadingText="Loading..."/>
                </form>
            </div>

        </>)
};

export default Register;
