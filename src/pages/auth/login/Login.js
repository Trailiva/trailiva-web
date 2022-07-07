import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import { useForm } from "react-hook-form";
import {
  ACCESS_TOKEN,
  HAS_WORKSPACE,
  TOKEN_EXPIRY_DATE,
  VERIFICATION_TOKEN,
} from "../../../constants";
import AuthButton from "../../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState } from "react";
import { extractErrorMessage } from "../../../utils/helper";
import {
  handleForgetPasswordToken,
  handleUserLogin,
} from "../../../services/authService";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import IsInputComponent from "../../../components/InputFields/IsInputComponent";

const Login = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await handleUserLogin(data);
      localStorage.setItem(ACCESS_TOKEN, res.data.jwtToken);
      setLoading(false);
      if (!localStorage.getItem(HAS_WORKSPACE)) navigate("/create-workspace");
      else navigate("/");
    } catch (error) {
      setLoading(false);
      const message = extractErrorMessage(error);
      toast.error(message);
    }
    reset({
      email: "",
      password: "",
    });
  };

  const handleError = (errors) => console.log(errors);

  const forgetPasswordHandler = async () => {
    try {
      let response = await handleForgetPasswordToken();
      localStorage.setItem(VERIFICATION_TOKEN, response.data.token);
      localStorage.setItem(TOKEN_EXPIRY_DATE, response.data.expiry);
      navigate("/forget-password");
    } catch (err) {
      const message = extractErrorMessage(err);
      toast.error(message);
      console.log("error ==> ", err);
    }
  };

  return (
    <>
      <Navbar text="Create Account" path="/register" />
      <div className="form-container">
        <Box variant="body1">
          <div className="form-header">
            <h2>Welcome Back Login</h2>
          </div>

          <form onSubmit={handleSubmit(login, handleError)} noValidate>
            <IsInputComponent
              label="Enter email address"
              name="email"
              type={"text"}
              control={control}
              placeholder="example@gmail.com"
              validation={registrationOption.email}
            />

            <IsInputComponent
              label="Enter a password"
              name="password"
              type={"password"}
              control={control}
              placeholder="Enter your password"
              validation={registrationOption.password}
            />

            <AuthButton
              disabled={loading}
              text="Login"
              loadingText="Logging..."
            />
          </form>
          <Link
            underline="hover"
            sx={{ color: "#3754DB", fontSize: "1rem" }}
            onClick={forgetPasswordHandler}
          >
            Forget password ?
          </Link>
        </Box>
      </div>
    </>
  );
};

export default Login;
