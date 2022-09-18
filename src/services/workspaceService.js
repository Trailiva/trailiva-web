import {ACCESS_TOKEN} from "../constants";
import {api} from "../api/api";

// export const handleFetchWorkspaceTasks = () => {
//     const workspaceId = localStorage.getItem(WORKSPACE_ID)
//     return api.get(`/tasks/workspace/${workspaceId}`, {
//         headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
//     })
// }

export const handlePersonalWorkspaceDetails = () => {
    return api.get("my-workspace/personal", {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const handleOfficialWorkspaceDetails = () => {
    return api.get("my-workspace/official", {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}


export const getUserWorkspaces = () => {
    return api.get("/workspace", {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    })
}

export const handleOfficialWorkspaceCreation = (data) => {
    return api.post("workspace/official/create", data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    });
}
export const handlePersonalWorkspaceCreation = (data) => {
    return api.post("workspace/personal/create", data, {
        headers: {"Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}
    });
}



