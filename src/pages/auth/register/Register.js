import "./register.css";
import Navbar from "../../../components/Navbar";
import { registrationOption } from "../../../utils/formValidation";
import FormControl from "../../../components/FormControl";
import AuthButton from "../../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { extractErrorMessage } from "../../../utils/helper";
import { toast } from "react-toastify";
import { handleUserRegistration } from "../../../services/authService";
import Box from "@mui/material/Box";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
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
