import {createSlice} from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
    name: "workspace",
    initialState: {
        isLoading: false,
        errorMsg: "",
        isSuccessful: false,
        errorStatus: ""
    },
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setErrorMsg(state, action) {
            state.errorMsg = action.payload;
        },
        setIsSuccessful(state, action) {
            state.isSuccessful = action.payload;
        },
        setErrorStatus(state, action){
            state.errorStatus = action.payload;
        }
    },
});

export const workspaceAction = workspaceSlice.actions;

export default workspaceSlice.reducer;