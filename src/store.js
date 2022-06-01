import {configureStore} from '@reduxjs/toolkit'
import {authApi} from "./services/authService";
import { dashboardApi } from "./services/dashboardService";


const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            [authApi.middleware],
            [dashboardApi.middleware]
        )
})
export default store