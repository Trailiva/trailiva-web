import {api} from "../api/api";
import {ACCESS_TOKEN} from "../constants";

export const handleCreateTask = (data) => {
    return api.post("/tasks/create/" + localStorage.getItem("WORKSPACE_ID"), data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const getTask = id => {
    const workspaceId = localStorage.getItem("WORKSPACE_ID");
    return api.get(`/tasks/${workspaceId}/${id}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}
