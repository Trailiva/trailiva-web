import { api } from "../api/api";
import { ACCESS_TOKEN, FORGET_PASSWORD_TOKEN, USER_EMAIL } from "../constants";

export const getCurrentUser = () => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error("Token is not set"));
  }
  return api.get("/users/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
  });
};

export const handleForgetPasswordToken = (email) => {
  return api.post(`auth/password/reset?email=${email}`);
};

export const handleForgetPassword = (data) => {
  const token = localStorage.getItem(FORGET_PASSWORD_TOKEN);
  if (!token) return Promise.reject("Token not set");
  return api.post(`auth/password/save-reset-password`, data);
};

export const handleResetPassword = (data) => {
  const userData = {
    email: data.email,
    oldPassword: data.oldPassword,
    password: data.password,
  };
  return api.post(`auth/password/reset`, userData);
};

export const handleUserRegistration = (data) => {
  const userData = {
    firstName: data.fullName.split(" ")[0],
    lastName: data.fullName.split(" ")[1],
    email: data.email,
    password: data.password,
  };
  return api.post("/auth/register", userData);
};

export const handleUserLogin = (data) => {
  const userData = {
    email: data.email,
    password: data.password,
  };
  return api.post("/auth/login", userData);
};

export const handleTokenVerification = (token) => {
  return api.get(`/auth/verify-token?token=${token}`);
};

export const handleResetVerificationToken = () => {
  return api.get(`/auth/resend-token?email=${USER_EMAIL}`);
};
