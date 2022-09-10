import {api} from "../api/api";
import {ACCESS_TOKEN} from "../constants";

export const handleProjectCreation = (data) => {
    return api.post("project/create", data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    });
}