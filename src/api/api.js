import axios from "axios";
import {API_BASE_URL_LOCAL} from "../constants";

export const api = axios.create({
    baseURL: API_BASE_URL_LOCAL,
})