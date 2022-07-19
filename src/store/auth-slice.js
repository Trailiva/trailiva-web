import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
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

export const authAction = authSlice.actions;

export default authSlice.reducer;
