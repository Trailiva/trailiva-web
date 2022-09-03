import "./register.css";
import Navbar from "../../../components/Navbar";
import {registrationOption} from "../../../utils/formValidation";
import FormControl from "../../../components/FormControl";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {userRegistration} from "../../../store/auth-actions";
import {authAction} from "../../../store/auth-slice";
import CustomButton from "../../../components/Buttons/CustomButton";

const Register = () => {
    const dispatchFn = useDispatch();
    const loading = useSelector((state) => state.auth.isLoading);
    const errorMessage = useSelector((state) => state.auth.errorMsg);
    const navigate = useNavigate();

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
            console.log("showing");
        }

        return () => {
            setTimeout(() => {
                dispatchFn(authAction.setErrorMsg(""));
            }, 5000);
        };
    }, [errorMessage, dispatchFn]);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm();

    const registerUser = (data) => {
        const navigateToVerify = () => {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            });
            navigate("/to-verify");
        };

        dispatchFn(userRegistration(data, navigateToVerify));
    };

    const handleError = (errors) => console.log(errors);

    const loadingIcon = (
        <i className="fa fa-refresh fa-spin" style={{marginRight: "5px"}}/>
    );

    return (
        <div className="home-page">
            <div className="second-div">
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
                            useForm_register_return={register(
                                "firstName",
                                registrationOption.fullName
                            )}
                            errors={errors}
                        />

                        <FormControl
                            label="Enter your last name"
                            name="lastName"
                            placeholder="Doe"
                            visibility={false}
                            useForm_register_return={register(
                                "lastName",
                                registrationOption.fullName
                            )}
                            errors={errors}
                        />

                        <FormControl
                            label="Enter email address"
                            name="email"
                            placeholder="example@gmail.com"
                            visibility={false}
                            useForm_register_return={register(
                                "email",
                                registrationOption.email
                            )}
                            errors={errors}
                        />

                        <FormControl
                            label="Enter a password"
                            name="password"
                            placeholder="Enter your password"
                            visibility={true}
                            useForm_register_return={register(
                                "password",
                                registrationOption.password
                            )}
                            errors={errors}
                        />

                        {/*<AuthButton*/}
                        {/*  disabled={loading}*/}
                        {/*  text="Create Account"*/}
                        {/*  loadingText="Loading..."*/}
                        {/*/>*/}
                        <CustomButton
                            text={{
                                value: loading ? "logging..." : "create account",
                            }}
                            handleClick={handleSubmit(registerUser, handleError)}
                            fullWidth={true}
                            disableElevation={true}
                            disabled={loading}
                            variant={"primary"}
                            color={"rgba(55, 84, 219, 1)"}
                            size={"large"}
                            startIcon={null}
                            loading={{
                                position: "start",
                                status: loading,
                                indicator: loadingIcon,
                            }}
                            sx={{
                                marginTop: "1rem",
                            }}
                        />
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Register;
