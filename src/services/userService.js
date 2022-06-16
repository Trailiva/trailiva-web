import {api} from "../api/api";
import {ACCESS_TOKEN} from "../constants";
import axios from "axios";

export const handleImageUpload = (imageData) => {
    return api.post("users/profile/upload", imageData, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
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

export const getRandomQuote = () => {
    return axios.get("https://api.quotable.io/random");
}