import React, {useEffect} from 'react';
import Navbar from "../../../components/Navbar";
import IsInputComponent from "../../../components/InputFields/IsInputComponent";
import {registrationOption} from "../../../utils/formValidation";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {authAction} from "../../../store/auth-slice";
import {useForm} from "react-hook-form";
import CustomButton from "../../../components/Buttons/CustomButton";
import {forgotPassword} from "../../../store/auth-actions";

const CreateNewPassword = () => {
    const dispatchFn = useDispatch();
    const loading = useSelector((state) => state.auth.isLoading);
    const errorMessage = useSelector((state) => state.auth.errorMsg);
    const isSuccessful = useSelector((state) => state.auth.isSuccessful)
    const navigate = useNavigate();

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage);
        }

        return () => {
            setTimeout(() => {
                dispatchFn(authAction.setErrorMsg(""));
            }, 5000);
        };
    }, [errorMessage, dispatchFn]);

    const { handleSubmit, reset, control } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const updatePassword = (data) => {
        if (data.password.trim() !== data.confirmPassword.trim()){
            toast.error("Password does not match");
            return;
        }
        const navigateToLogin = () => {
            reset({
                password: "",
                confirmPassword: "",
            });
          if (isSuccessful) navigate("/login")
        };
        dispatchFn(forgotPassword(data, navigateToLogin));
    };

    const handleError = (errors) => console.log(errors);

    const loadingIcon = (
        <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
    );


    return (
        <div className="home-page">
            <div className="second-div">
                <Navbar text="Login" path="/login" />
                <div className="form-container">
                    <div className="form-header">
                        <h2>Enter New Password</h2>
                        <p>Your account was recovered. To regain full control of your account, enter your new password.</p>
                    </div>

                    <form onSubmit={handleSubmit(updatePassword, handleError)} noValidate>
                        <IsInputComponent
                            label="Enter a password"
                            name="password"
                            type="password"
                            control={control}
                            placeholder="Enter your password"
                            validation={registrationOption.password}
                        />

                        <IsInputComponent
                            label="Confirm password"
                            name="confirmPassword"
                            type="password"
                            control={control}
                            placeholder="Enter your password"
                            validation={registrationOption.password}
                        />

                        <CustomButton
                            text={{
                                value: loading ? "Loading..." : "save",
                            }}
                            handleClick={handleSubmit(updatePassword, handleError)}
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
                                textTransform: "capitalize"
                            }}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateNewPassword;