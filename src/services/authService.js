import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
const {REACT_APP_LOCAL_BASE_URL} = process.env

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl:  REACT_APP_LOCAL_BASE_URL}),
    endpoints: (builder) => ({
        onLogin: builder.mutation({
            query:(userData) => ({
                url: 'auth/login',
                method: 'POST',
                body: userData
            })
        }),

        onRegister: builder.mutation({
            query:(userData) => ({
                url: 'auth/register',
                method: 'POST',
                body: userData
            })
        })
    })

})

export const logout = () => {
    if (localStorage.getItem("accessToken")) localStorage.removeItem("accessToken");
}

export const {useOnLoginMutation, useOnRegisterMutation} = authApi;

