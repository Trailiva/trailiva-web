import { authAction } from "./auth-slice";
import { extractErrorMessage } from "../utils/helper";
import {
  handleUserLogin,
  handleForgetPasswordToken,
  handleUserRegistration,
  handleForgetPassword,
  handleResetPassword,
} from "../services/authService";
import {
  ACCESS_TOKEN,
  FORGET_PASSWORD_TOKEN,
  TOKEN_EXPIRY_DATE,
} from "../constants";

export const userLogin = (data, getStoredWorkspace) => {
  return async (dispatch) => {
    dispatch(authAction.setIsLoading(true));
    try {
      const res = await handleUserLogin(data);
      localStorage.setItem(ACCESS_TOKEN, res.data.jwtToken);
      dispatch(authAction.setIsLoading(false));
      getStoredWorkspace();
    } catch (error) {
      dispatch(authAction.setIsLoading(false));
      const message = extractErrorMessage(error);
      dispatch(authAction.setErrorMsg(message));
    }
  };
};

export const forgetPasswordToken = (email, navigateToResetPassword) => {
  return async (dispatch) => {
    dispatch(authAction.setIsLoading(true));
    try {
      let response = await handleForgetPasswordToken(email);
      dispatch(authAction.setIsLoading(false));
      localStorage.setItem(FORGET_PASSWORD_TOKEN, response.data.token);
      navigateToResetPassword();
    } catch (err) {
      dispatch(authAction.setIsLoading(false));
      const message = extractErrorMessage(err);
      dispatch(authAction.setErrorMsg(message));
    }
  };
};

export const userRegistration = (data, navigateToVerify) => {
  return async (dispatch) => {
    dispatch(authAction.setIsLoading(true));
    try {
      const res = await handleUserRegistration(data);
      localStorage.setItem("email", res.data.email);
      dispatch(authAction.setIsLoading(false));
      dispatch(authAction.setData(res.data));
      navigateToVerify();
    } catch (err) {
      dispatch(authAction.setIsLoading(false));
      const message = extractErrorMessage(err);
      dispatch(authAction.setErrorMsg(message));
    }
  };
};

export const forgotPassword = (data, navigateToLogin) => {
  const token = localStorage.getItem(FORGET_PASSWORD_TOKEN);
  const userData = {
    token,
    password: data.password,
  };
  return async (dispatch) => {
    dispatch(authAction.setIsLoading(true));
    try {
      const res = await handleForgetPassword(userData);
      localStorage.removeItem(FORGET_PASSWORD_TOKEN);
      dispatch(authAction.setIsLoading(false));
      if (res.data.successful) {
        dispatch(authAction.setIsSuccessful(true));
      }
      navigateToLogin();
    } catch (err) {
      dispatch(authAction.setIsLoading(false));
      const message = extractErrorMessage(err);
      dispatch(authAction.setErrorMsg(message));
    }
  };
};

export const resetPassword = (data, navigateToLoginHandler) => {
  return async (dispatch) => {
    dispatch(authAction.setIsLoading(true));
    try {
      const res = await handleResetPassword(data);
      dispatch(authAction.setIsLoading(false));
      if (res.data.successful) {
        dispatch(authAction.setSuccessMsg("Password changed successfully!"));
      }
      navigateToLoginHandler();
    } catch (err) {
      dispatch(authAction.setIsLoading(false));
      const message = extractErrorMessage(err);
      dispatch(authAction.setErrorMsg(message));
    }
  };
};
