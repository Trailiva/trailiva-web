import {createSlice} from "@reduxjs/toolkit";

const workspaceSlice = createSlice({
    name: "workspace",
    initialState: {
        isLoading: false,
        errorMsg: "",
        isSuccessful: "",
    },
    reducers: {
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        setErrorMsg(state, action) {
            state.errorMsg = action.payload;
        },
        setSuccessMsg(state, action) {
            state.isSuccessful = action.payload;
        },
    },
});

export const workspaceAction = workspaceSlice.actions;

export default workspaceSlice.reducer;