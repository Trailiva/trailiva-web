import reducer from "./bugs";
import {configureStore} from "@reduxjs/toolkit";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return configureStore({reducer});
};
