import {projectAction} from "./project-slice";
import {handlePersonalProjectCreation} from "../services/projectService";
import {extractErrorMessage} from "../utils/helper";

export const createProjectHandler = data => {
    return async (dispatch) => {
        dispatch(projectAction.setIsLoading(true));
        try {
            const res = await handlePersonalProjectCreation(data);
            dispatch(projectAction.setIsLoading(false));
            dispatch(projectAction.setIsSuccessful(true));
            localStorage.setItem("PROJECT_ID", res.data.projectId);
        } catch (err) {
            dispatch(projectAction.setIsLoading(false));
            if (err.response) dispatch(projectAction.setErrorStatus(err.response.status))
            const message = extractErrorMessage(err);
            dispatch(projectAction.setErrorMsg(message));
        }

    };
};