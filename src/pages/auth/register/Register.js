import "./register.css";
import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../../store/auth-actions";
import { authAction } from "../../../store/auth-slice";

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
    formState: { errors },
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

  return (
    <>
      <Navbar text="Login" path="/login" />
      <div className="form-container">
        <Box variant="body1">
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

            <AuthButton
              disabled={loading}
              text="Create Account"
              loadingText="Loading..."
            />
          </form>
        </Box>
      </div>
    </>
  );
};

export default Register;
