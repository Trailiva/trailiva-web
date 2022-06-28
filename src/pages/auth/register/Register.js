import "./register.css";
import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import IsInputComponent from "../../../components/IsInputComponent";
import AuthButton from "../../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


const Register = () => {
  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [onRegister, response] = useOnRegisterMutation();

  const registerUser = async (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    try {
      const response = await onRegister(userData).unwrap();
      localStorage.setItem("user", JSON.stringify(response));
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      navigate("/to-verify");
    } catch (error) {
      console.log(error);
      if (isFetchBaseQueryError(error)) {
        toast.error(error.error);
      } else if (isErrorWithMessage(error)) {
        toast.error(error.data.message);
      } else toast.error(error);
    }
  };


  const handleError = (errors) => console.log(errors);

  return (
    <>
      <Navbar text="Login" path="/login" />
      <div className="form-container">
        <div className="form-header">
          <h2>Create an Account</h2>
          <p>It's Simple and Easy !!</p>
        </div>
        <form onSubmit={handleSubmit(registerUser, handleError)} noValidate>
          <IsInputComponent
            label={"Enter your first name"}
            name={"firstName"}
            placeholder={"John"}
            type={"text"}
            control={control}
            validation={registrationOption.fullName}
          />

          <IsInputComponent
            label={"Enter your last name"}
            name={"lastName"}
            placeholder={"Doe"}
            control={control}
            type={"text"}
            validation={registrationOption.fullName}
          />

          <IsInputComponent
            label={"Enter email address"}
            name={"email"}
            placeholder={"example@gmail.com"}
            type={"text"}
            control={control}
            validation={registrationOption.email}
          />

          <IsInputComponent
            label={"Enter a password"}
            name={"password"}
            placeholder={"Enter your password"}
            type={"password"}
            control={control}
            validation={registrationOption.password}
          />


          <AuthButton
            disabled={response.isLoading}
            text="Create Account"
            loadingText="Loading..."
          />
        </form>
      </div>
    </>
  );
};

export default Register;
