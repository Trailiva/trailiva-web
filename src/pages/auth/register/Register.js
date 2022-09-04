// eslint-disable-next-line no-unused-vars
import React, {useEffect} from "react";
import "./register.css";
import Navbar from "../../../components/Navbar";
import {registrationOption} from "../../../utils/formValidation";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {userRegistration} from "../../../store/auth-actions";
import {authAction} from "../../../store/auth-slice";
import CustomButton from "../../../components/Buttons/CustomButton";
import IsInputComponent from "../../../components/InputFields/IsInputComponent";

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

    const {handleSubmit, reset, control} = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });
    const registerUser = (data) => {
        const navigateToVerify = () => {
            reset({
                fullName: "",
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
                        <IsInputComponent
                            label="Enter your full name"
                            name="fullName"
                            type="text"
                            control={control}
                            placeholder="John Doe"
                            validation={registrationOption.fullName}
                        />

                        <IsInputComponent
                            label="Enter email address"
                            name="email"
                            type="email"
                            control={control}
                            placeholder="example@gmail.com"
                            validation={registrationOption.email}
                        />

                        <IsInputComponent
                            label="Enter a password"
                            name="password"
                            type="password"
                            control={control}
                            placeholder="Enter your password"
                            validation={registrationOption.password}
                        />


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