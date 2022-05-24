import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "../services/authService";
import {ACCESS_TOKEN} from "../constants";

const authToken = localStorage.getItem(ACCESS_TOKEN);
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    isLoggedIn: !!authToken,
    user: user ? user : null,
    message: "",
    isError: false,
    isSuccess: false,
    isLoading: false,
    authToken: authToken ? authToken : "",
}

export const registerHandler = createAsyncThunk("auth/registerHandler", async (data, thunkAPI) => {
    try {
        const response = await authService.register(data);
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

export const handleLogin = createAsyncThunk("auth/handleLogin", async (data, thunkAPI) => {
    try {
        const response = await authService.login(data);
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

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
})

const authSlice = createSlice({
    name: "auth",
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
        builder.addCase(registerHandler.pending, (state) => {
            state.isLoading = true
        })
            .addCase(registerHandler.fulfilled, (state, {payload}) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = payload
            })
            .addCase(registerHandler.rejected, (state, {payload}) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
                state.isSuccess = false
            })
            .addCase(handleLogin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(handleLogin.fulfilled, (state, {payload}) => {
                state.isLoggedIn = true;
                state.isLoading = false
                state.isSuccess = true
                state.authToken = payload.authToken;
            })
            .addCase(handleLogin.rejected, (state, {payload}) => {
                state.isLoggedIn = false;
                state.user = null;
                state.isError = true
                state.message = payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
    },
});
export const {handleReset} = authSlice.actions;
export default authSlice.reducer;
