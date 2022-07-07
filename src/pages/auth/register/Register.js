import "./register.css";
import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import AuthButton from "../../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { extractErrorMessage } from "../../../utils/helper";
import { toast } from "react-toastify";
import { handleUserRegistration } from "../../../services/authService";
import { Box } from "@mui/material";
import IsInputComponent from "../../../components/InputFields/IsInputComponent";
import { Link } from "react-router-dom";
import logo from "../../../images/Trailiva name logo.svg";

const Register = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const registerUser = async (data) => {
    setLoading(true);
    try {
      const res = await handleUserRegistration(data);
      localStorage.setItem("email", res.data.email);
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      navigate("/to-verify");
    } catch (err) {
      setLoading(false);
      const message = extractErrorMessage(err);
      toast.error(message);
      console.log("err", err);
    }
  };

  const handleError = (errors) => console.log(errors);

  return (
    <div className={"create-acc-container"}>
      <div className={"bx-1"}>
        <div>
          <Link to="/" className="logo-img">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="title">Take your productivity to the next level.</div>
        <div className="copyright">Copyright 2022 | All Rights Reserved</div>
      </div>
      <div className={"bx-2"}>
        <Navbar text="Login" path="/login" />
        <div className="form-container">
          <Box variant="body1">
            <div className="form-header">
              <h2>Create an Account</h2>
              <p>It's Simple and Easy !!</p>
            </div>
            <form onSubmit={handleSubmit(registerUser, handleError)} noValidate>
              <IsInputComponent
                label="Enter your first name"
                name="firstName"
                type={"text"}
                control={control}
                placeholder="John"
                validation={registrationOption.fullName}
              />

              <IsInputComponent
                label="Enter your last name"
                name="lastName"
                type={"text"}
                control={control}
                placeholder="Doe"
                validation={registrationOption.fullName}
              />

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
                type={"password"}
                name="password"
                control={control}
                placeholder="Enter your password"
                validation={registrationOption.password}
              />

              <AuthButton
                disabled={loading}
                text="Create Account"
                loadingText="Loading..."
              />
            </form>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Register;
