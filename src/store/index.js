import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import workspaceReducer from "./workspace-slice";
import projectReducer from "./project-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
    project: projectReducer
  },
});

export default store;