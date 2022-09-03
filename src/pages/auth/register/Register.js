import "./register.css";
import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import AuthButton from "../../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../../store/auth-actions";
import { authAction } from "../../../store/auth-slice";
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

  const { handleSubmit, reset, control } = useForm({
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

  return (
    <div className="home-page">
      <div className="main-div">
        <Navbar text="Login" path="/login" />
        <div className="form-container">
          <div className="form-header">
            <h2>Create an Account</h2>
            <p>{`It's`}Simple and Easy !!</p>
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

            <AuthButton
              disabled={loading}
              text="Create Account"
              loadingText="Loading..."
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
