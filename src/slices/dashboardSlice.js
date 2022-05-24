import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import dashboardService from "../services/dashboardService";

const profile = JSON.parse(localStorage.getItem("profile"));
const workspace = JSON.parse(localStorage.getItem("profile"));

const initialState = {
    profile: profile ? profile : null,
    workspace: workspace ? workspace : null,
    quote: null,
    message: "",
    isError: false,
    isSuccess: false,
    isLoading: false
}

export const userProfileHandler = createAsyncThunk("profile/handleUserProfile", async (arg, thunkAPI) => {
    try {
        const response = await dashboardService.getUserProfile();
        return response.data;
    } catch (error) {
        const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message);
    }
})

export const userWorkspaceHandler = createAsyncThunk("profile/handleUserWorkspace", async (arg, thunkAPI) => {
    try {
        const response = await dashboardService.getWorkspaceDetail();
        return response.data;
    } catch (error) {
        const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const randomQuoteHandler = createAsyncThunk("profile/handleQuote", async (arg, thunkAPI) => {
    try {
        const response = await dashboardService.getRandomQuote();
        return response.data;
    } catch (error) {
        const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const dashboardSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        handleReset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userProfileHandler.pending, (state) => {
            state.isLoading = true
        })
            .addCase(userProfileHandler.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.isSuccess = true
                state.profile = payload
            })
            .addCase(userProfileHandler.rejected, (state, {payload}) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
                state.isSuccess = false
                state.profile = null
            })
            .addCase(userWorkspaceHandler.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userWorkspaceHandler.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.isSuccess = true
                state.workspace = payload;
            })
            .addCase(userWorkspaceHandler.rejected, (state, {payload}) => {
                state.workspace = null;
                state.isError = true
                state.message = payload
                state.isSuccess = false
            })
            .addCase(randomQuoteHandler.pending, (state) => {
                state.isLoading = true
            })
            .addCase(randomQuoteHandler.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.isSuccess = true
                state.quote = payload;
            })
            .addCase(randomQuoteHandler.rejected, (state, {payload}) => {
                state.quote = null;
                state.isError = true
                state.message = payload
                state.isSuccess = false
            })
    },
});
export const {handleReset} = dashboardSlice.actions;
export default dashboardSlice.reducer;
