import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ACCESS_TOKEN} from "../constants";
const {REACT_APP_LOCAL_BASE_URL} = process.env
  export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
            baseUrl: REACT_APP_LOCAL_BASE_URL,
            prepareHeaders: (headers) => {
                headers.set("Authorization", `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
                return headers;
            }
        }),

    endpoints: (builder) => ({
        profile: builder.query({
            query: () => "/users/profile",
        }),
        workspace: builder.query({
            query: () => "/workspace/my-workspace/1",
        })
    })

})



export const { useProfileQuery, useWorkspaceQuery} = dashboardApi;
