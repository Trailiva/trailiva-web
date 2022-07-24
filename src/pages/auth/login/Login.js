import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import { useForm } from "react-hook-form";
import { HAS_WORKSPACE } from "../../../constants";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
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
      setTimeout(()=>{
        dispatchFn(authAction.setErrorMsg(""));
      }, 5000)
    };
  }, [errorMessage, dispatchFn]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  return (
    <>
      <Navbar text="Create Account" path="/register" />
      <div className="form-container">
        <Box variant="body1">
          <div className="form-header">
            <h2>Welcome Back Login</h2>
          </div>

          <form onSubmit={handleSubmit(login, handleError)} noValidate>
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
