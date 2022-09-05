import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    errorMsg: "",
    isSuccessful: false,
    successMsg: "",
    data: "",
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
    setData(state, action){
      state.data = action.payload
    },
    setSuccessMsg(state, action) {
      state.successMsg = action.payload
    }
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
