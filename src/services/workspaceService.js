import {ACCESS_TOKEN, WORKSPACE_ID} from "../constants";
import {api} from "../api/api";

export const handleFetchWorkspaceTasks = () => {
    const workspaceId = localStorage.getItem(WORKSPACE_ID)
    return api.get(`/tasks/workspace/${workspaceId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const handleWorkspaceDetails = () => {
    const workspaceId = localStorage.getItem(WORKSPACE_ID)
    return api.get(`/workspace/my-workspace/${workspaceId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}


export const getUserWorkspaces = () => {
    return api.get("/workspace", {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const handleWorkspaceCreation = (data) => {
    return api.post("workspace/create", data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    });
}