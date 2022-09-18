import {api} from "../api/api";
import {ACCESS_TOKEN} from "../constants";

export const handleCreateTask = (data) => {
    return api.post("/tasks/create/" + localStorage.getItem("PROJECT_ID"), data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const getTask = id => {
    const projectId = localStorage.getItem("PROJECT_ID");
    return api.get(`/tasks/${projectId}/${id}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}
