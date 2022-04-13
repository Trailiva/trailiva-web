import {ACCESS_TOKEN, AUTH_HEADER} from "../constants";
import {api} from "./api";
import axios from "axios";

export const getCurrentUser = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }
    return api.get("/users/profile", {
        headers: AUTH_HEADER
    });
}

export const handleImageUploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    data.append("folder", "/trailiva");

    return await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data
    );
}

export const handleImageUpload = (imageData) => {
    return api.post("users/profile/upload", imageData, {
        headers: AUTH_HEADER
    })
}

export const deleteImageUploadToCloudinary = (publicId) => {
    return api.post("users/profile/delete?public_id="+publicId, {
            headers: AUTH_HEADER
        }
    )
}