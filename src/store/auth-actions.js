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
  VERIFICATION_TOKEN,
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

export const forgetPasswordToken = (changePage) => {
  return async (dispatch) => {
    try {
      let response = await handleForgetPasswordToken();
      localStorage.setItem(VERIFICATION_TOKEN, response.data.token);
      localStorage.setItem(TOKEN_EXPIRY_DATE, response.data.expiry);
      changePage();
    } catch (err) {
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
      navigateToVerify();
    } catch (err) {
      dispatch(authAction.setIsLoading(false));
      const message = extractErrorMessage(err);
      dispatch(authAction.setErrorMsg(message));
    }
  };
};

export const forgotPassword = (data, navigateToLogin) => {
  return async (dispatch) => {
    dispatch(authAction.setIsLoading(true));
    try {
      const res = await handleForgetPassword(data);
      localStorage.removeItem(VERIFICATION_TOKEN);
      localStorage.removeItem(TOKEN_EXPIRY_DATE);
      dispatch(authAction.setIsLoading(false));
      if (res.data.successful) {
        dispatch(authAction.setSuccessMsg("Password recovered!"));
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
