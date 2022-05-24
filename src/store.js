import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";

const store = configureStore({
    reducer: {auth: authReducer, profile: dashboardReducer},
    devTools: true,
})
export default store