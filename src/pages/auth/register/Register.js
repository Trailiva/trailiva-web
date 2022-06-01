import "./register.css";
import Navbar from "../../../components/Navbar";
import {registrationOption} from "../../../utils/formValidation";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import {useOnRegisterMutation} from "../../../services/authService";
import {isErrorWithMessage, isFetchBaseQueryError} from "../../../helpers";
import {ACCESS_TOKEN} from "../../../constants";


const Register = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [onRegister, response] = useOnRegisterMutation();

    const registerUser = async (data) => {
        const userData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        };
        try {
            const response = await onRegister(userData).unwrap();
            localStorage.setItem("user", JSON.stringify(response))
            reset({
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            })
            navigate("/to-verify");
        }catch (error){
            console.log(error)
            if (isFetchBaseQueryError(error)) {
                toast.error(error.error);
            } else if (isErrorWithMessage(error)){
                toast.error(error.data.message);
            }
            else toast.error(error);
        }
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

                    <AuthButton disabled={response.isLoading} text="Create Account" loadingText="Loading..."/>
                </form>
            </div>

        </>)
};

export default Register;
