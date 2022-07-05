import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { Alert } from "@mui/material";
import FormControl from "../../../components/FormControl";
import { registrationOption } from "../../../utils/formValidation";
import AuthButton from "../../../components/AuthButton";
import { useForm } from "react-hook-form";
import { TOKEN_EXPIRY_DATE, VERIFICATION_TOKEN } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { handleForgetPassword } from "../../../services/authService";
import {extractErrorMessage} from "../../../utils/helper";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSuccessFul, setIsSuccessFul] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorDate, setErrorData] = useState("");
  const navigate = useNavigate();

  const forgetPassword = async (data) => {
    setLoading(true);
    try {
      const res = await handleForgetPassword(data);
      localStorage.removeItem(VERIFICATION_TOKEN);
      localStorage.removeItem(TOKEN_EXPIRY_DATE);
      setLoading(false);
      toast.success(res.data.successful);
      navigate("/login");
    } catch (err) {
      setErrorData(err);
      const message = extractErrorMessage(err);
      toast.error(message);
      setLoading(false);
      setIsSuccessFul(false);
    }
    reset({
      email: "",
      password: "",
    });
  };

  const handleError = (errors) => console.log(errors);

  return (
    <>
      <Navbar path="/quoteHandler" text="Create Account" />
      <div className="form-container">
        <Box variant="body1">
          {!isSuccessFul && (
              <Alert
                  variant="filled"
                  severity="error"
                  style={{ marginBottom: "1rem" }}
              >
                {errorDate}!
              </Alert>
          )}
          <div className="form-header">
            <h2>Forget Password</h2>
          </div>

          <form onSubmit={handleSubmit(forgetPassword, handleError)} noValidate>
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
                text="Recover Account"
                loadingText="Loading..."
            />
          </form>
        </Box>
      </div>
    </>
  );
};

export default ForgetPassword;
