import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { Alert } from "@mui/material";
import FormControl from "../../../components/FormControl";
import { registrationOption } from "../../../utils/formValidation";
import AuthButton from "../../../components/AuthButton";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../store/auth-slice";
import { resetPassword } from "../../../store/auth-actions";

const ResetPassword = () => {
  const dispatchFn = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth.errorMsg);
  const isSuccessful = useSelector((state) => state.auth.isSuccessful);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    } else if (isSuccessful) {
      toast.success(isSuccessful);
    }

    return () => {
      setTimeout(() => {
        dispatchFn(authAction.setErrorMsg(""));
        dispatchFn(authAction.setSuccessMsg(""));
      }, 5000);
    };
  }, [errorMessage, dispatchFn, isSuccessful]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const resetPasswordHandler = async (data) => {
    const navigateToLoginHandler = () => {
      reset({
        email: "",
        oldPassword: "",
        password: "",
      });
      navigate("/loginHandler");
    };
    dispatchFn(resetPassword(data, navigateToLoginHandler));
  };

  const handleError = (errors) => console.log(errors);

  return (
    <>
      <Navbar path="/register" text="Create Account" />
      <div className="form-container">
        <Box variant="bod1">
          {errorMessage && (
            <Alert
              variant="filled"
              severity="error"
              style={{ marginBottom: "1rem" }}
            >
              {errorMessage}!
            </Alert>
          )}
          <div className="form-header">
            <h2>Reset Password</h2>
          </div>

          <form
            onSubmit={handleSubmit(resetPasswordHandler, handleError)}
            noValidate
          >
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
              label="Enter your old password"
              name="password"
              placeholder="Enter your password"
              visibility={true}
              useForm_register_return={register(
                "oldPassword",
                registrationOption.password
              )}
              errors={errors}
            />

            <FormControl
              label="Enter a your new password"
              name="password"
              placeholder="Enter your password"
              visibility={true}
              useForm_register_return={register(
                "password",
                registrationOption.password
              )}
              errors={errors}
            />

            <AuthButton
              disabled={loading}
              text="Reset Password"
              loadingText="Loading..."
            />
          </form>
        </Box>
      </div>
    </>
  );
};

export default ResetPassword;
