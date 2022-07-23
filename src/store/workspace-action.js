import {workspaceAction} from "./workspace-slice";
import {extractErrorMessage} from "../utils/helper";
import {handleWorkspaceCreation} from "../services/workspaceService";

export const createWorkspaceHandler = (data, getStoredWorkspace) => {
    return async (dispatch) => {
        dispatch(workspaceAction.setIsLoading(true));
        try {
            const res = await handleWorkspaceCreation(data);
            dispatch(workspaceAction.setIsLoading(false));
            localStorage.setItem("HAS_WORKSPACE", true);
            localStorage.setItem("WORKSPACE_ID", res.data.workspaceId);
        } catch (err) {
            dispatch(workspaceAction.setIsLoading(false));
                const message = extractErrorMessage(err);
                dispatch(workspaceAction.setErrorMsg(message));
        }

    };
};
