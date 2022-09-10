import {createSlice} from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: "project",
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

export const projectAction = projectSlice.actions;
export default projectSlice.reducer;