import Navbar from "../../../components/Navbar";
import {registrationOption} from "../../../utils/formValidation";
import {useForm} from "react-hook-form";
import {ACCESS_TOKEN, TOKEN_EXPIRY_DATE, VERIFICATION_TOKEN} from "../../../constants";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import {Link, useNavigate} from "react-router-dom";
import {handleForgetPasswordToken} from "../../../api/ApiUtils";
import 'react-toastify/dist/ReactToastify.css';
import {useOnLoginMutation} from "../../../services/authService";
import {isErrorWithMessage, isFetchBaseQueryError} from "../../../helpers";
import {toast} from "react-toastify";

const Login = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const [onLogin, response] = useOnLoginMutation();

    const onHandleLogin = async data => {
        const userData = {
            email: data.email,
            password: data.password
        };
        try {
            const response = await onLogin(userData).unwrap();
            localStorage.setItem(ACCESS_TOKEN, response.jwtToken);
            reset({
                email: "",
                password: ""
            })
            navigate("/create-workspace")
        } catch (error) {
            if (isFetchBaseQueryError(error)) {
                    toast.error(error.error);
            } else if (isErrorWithMessage(error)){
                toast.error(error.data.message);
            }
            else toast.error(error);
        }
    }

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
                <div className="form-header">
                    <h2>Welcome Back Login</h2>
                </div>

                <form onSubmit={handleSubmit(onHandleLogin, handleError)} noValidate>
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

                    <AuthButton disabled={response.isLoading} text="Login" loadingText="Logging..."/>
                    <Link to="/forget-password" onClick={forgetPasswordHandler}>Forget password ?</Link>
                </form>
            </div>
        </>
    );

};

export default Login;