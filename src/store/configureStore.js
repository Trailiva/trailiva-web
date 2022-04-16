import reducer from "./reducer";
import {configureStore} from "@reduxjs/toolkit";

 const store = () => {
    return configureStore({reducer});
};
export default store
