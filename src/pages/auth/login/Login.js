import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import { useForm } from "react-hook-form";
import { HAS_WORKSPACE } from "../../../constants";
import IsInputComponent from "../../../components/InputFields/IsInputComponent";
import CustomButton from "../../../components/Buttons/CustomButton";
import AuthButton from "../../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import logoImage from "../../../images/logo name.svg";
import { useEffect } from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, forgetPasswordToken } from "../../../store/auth-actions";
import { authAction } from "../../../store/auth-slice";

const Login = () => {
  const dispatchFn = useDispatch();
  const loading = useSelector((state) => state.auth.isLoading);
  const errorMessage = useSelector((state) => state.auth.errorMsg);
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
      email: "",
      password: "",
    },
  });

  const login = (data) => {
    const getStoredWorkspace = () => {
      reset({
        email: "",
        password: "",
      });
      if (!localStorage.getItem(HAS_WORKSPACE)) navigate("/create-workspace");
      else navigate("/");
    };
    dispatchFn(userLogin(data, getStoredWorkspace));
  };

  const handleError = (errors) => console.log(errors);

  const forgetPasswordHandler = () => {
    const navigateToForgetPasswordPage = () => {
      navigate("/forget-password");
    };
    dispatchFn(forgetPasswordToken(navigateToForgetPasswordPage));
  };

  const loadingIcon = (
    <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
  );

  return (
    <div className="home-page">
      <div className="first-div">
        <div>
          <img src={logoImage} alt="logo" />
        </div>
        <div className="home-page-title">
          Take your productivity to the next level
        </div>
        <div>Copyright 2021 | All Right Reserved</div>
      </div>
      <div className="second-div">
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
                  value: loading ? "logging..." : "login",
                }}
                handleClick={handleSubmit(login, handleError)}
                fullWidth={true}
                disableElevation={true}
                disabled={loading}
                variant={"primary"}
                color={"rgba(55, 84, 219, 1)"}
                size={"large"}
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
            <Link
              underline="hover"
              sx={{ color: "#3754DB", fontSize: "1rem" }}
              onClick={forgetPasswordHandler}
            >
              Forget password ?
            </Link>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
