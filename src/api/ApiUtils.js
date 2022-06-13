import {ACCESS_TOKEN, USER_EMAIL} from "../constants";
import {api} from "./api";
import axios from "axios";


export const getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject(new Error("Token is not set"));
    }
    return api.get("/users/profile", {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    });
}

export const handleForgetPasswordToken = () => {
    if (!localStorage.getItem("email")) {
        return Promise.reject("email not set");
    }
    return api.get(`auth/password/token/${localStorage.getItem("email")}`)
}


export const handleForgetPassword = (data) => {
    if (!localStorage.getItem("verificationToken")) {
        return Promise.reject("Token not set");
    }
    const userData = {
        email: data.email,
        password: data.password
    };
    const token = localStorage.getItem("verificationToken");
    return api.post(`auth/password/forget-password/${token}`, userData);
}

export const handleResetPassword = (data) => {
    const userData = {
        email: data.email,
        oldPassword: data.oldPassword,
        password: data.password
    };
    return api.post(`auth/password/reset`, userData);
}

export const handleUserRegistration = (data) => {
    const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
    };
    return api.post("/auth/register", userData);
}

export const handleUserLogin = (data) => {
    const userData = {
        email: data.email,
        password: data.password
    };
    return api.post("/auth/login", userData)
}

export const handleTokenVerification = (token) => {
    return api.get(`/auth/registrationConfirm?token=${token}`)
}

export const handleResetVerificationToken = () => {
    return api.get(`/auth/resend-token?email=${USER_EMAIL}`);
}

export const handleWorkspaceCreation = (data) => {
    return api.post("workspace/create", data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    });
}

export const handleCreateTask = (data) => {
    return api.post("/tasks/create/" + localStorage.getItem("WORKSPACE_ID"), data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}


export const handleImageUpload = (imageData) => {
    return api.post("users/profile/upload", imageData, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const handleFetchWorkspaceTasks = () => {
    //Todo: Will change this later
    return api.get("/tasks/workspace/1", {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const handleWorkspaceDetails = () => {
    return api.get("/workspace/my-workspace/1",  {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const handleUserProfile =  () => {
    const getRandomQuote = api.get("https://api.quotable.io/random");
    const getUserProfile = getCurrentUser();
    const getWorkspaceDetails = handleWorkspaceDetails();
    return axios.all([getRandomQuote, getUserProfile, getWorkspaceDetails]);
}

export const handleImageUploadToCloudinary = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    data.append("folder", "/trailiva");
    return axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data
    );
}

export const getRandomQuote =  () => {
    return  axios.get("https://api.quotable.io/random");
}



