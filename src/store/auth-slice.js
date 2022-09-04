import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    errorMsg: "",
    isSuccessful: "",
    data: "",
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
    setData(state, action){
      state.data = action.payload
    }
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
