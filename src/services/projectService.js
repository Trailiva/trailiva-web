import {api} from "../api/api";
import {ACCESS_TOKEN, WORKSPACE_ID} from "../constants";

export const handlePersonalProjectCreation = (data) => {
    localStorage.getItem(WORKSPACE_ID)
    return api.post(`projects/personal/create/${localStorage.getItem(WORKSPACE_ID)}`, data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    });
}

export const handleProjectTasks = () => {
    const projectId = localStorage.getItem("PROJECT_ID")
    return api.get(`projects/project/${projectId}`, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}