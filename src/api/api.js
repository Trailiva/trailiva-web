import axios from "axios";
import {API_BASE_URL_LOCAL, API_BASE_URL_DEV} from "../constants";

export const api = axios.create({
    baseURL: API_BASE_URL_LOCAL,
})