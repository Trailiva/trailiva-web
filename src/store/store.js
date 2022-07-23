import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import workspaceReducer from "./workspace-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer
  },
});

export default store;
