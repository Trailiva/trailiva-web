import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ACCESS_TOKEN} from "../constants";

const {REACT_APP_LOCAL_BASE_URL} = process.env

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: REACT_APP_LOCAL_BASE_URL,
            prepareHeaders: (headers) =>
                headers.set("Authorization", `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
        }
    ),

    endpoints: (builder) => ({
        getCurrentLoggedInUser: builder.query({
            query: () => "/users/profile",
        })
    })

})

export const {useGetCurrentLoggedInUserQuery} = userApi;