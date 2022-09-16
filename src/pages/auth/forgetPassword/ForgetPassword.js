import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../store/auth-slice";
import { forgetPasswordToken } from "../../../store/auth-action";
import IsInputComponent from "../../../components/InputFields/IsInputComponent";
import CustomButton from "../../../components/Buttons/CustomButton";

const ForgetPassword = () => {
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

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const forgetPassword = (data) => {
    const navigateToResetPassword = () => {
      reset({
        email: "",
      });
      navigate("/reset-password");
    };
    dispatchFn(forgetPasswordToken(data, navigateToResetPassword));
  };

  const handleError = (errors) => console.log(errors);

  const loadingIcon = (
    <i className="fa fa-refresh fa-spin" style={{ marginRight: "5px" }} />
  );

  return (
    <div className="home-page">
      <div className="second-div">
        <Navbar path="/register" text="Create Account" />
        <div className="form-container">
          <div className="form-header">
            <h2>Forget Password</h2>
            <p>
              We are sorry to hear that happen. Don't be sad we could hep you get
              back to productivity in no time.
            </p>
          </div>

          <form onSubmit={handleSubmit(forgetPassword, handleError)} noValidate>
            <IsInputComponent
              label="Enter email address"
              name="email"
              type="email"
              control={control}
              placeholder="example@gmail.com"
              validation={registrationOption.email}
            />

            <CustomButton
              text={{
                value: loading ? "Loading..." : "Next",
              }}
              handleClick={handleSubmit(forgetPassword, handleError)}
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

export default ForgetPassword;
