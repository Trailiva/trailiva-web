import {ACCESS_TOKEN} from "../constants";
export default function () {
    const authToken = JSON.parse(localStorage.getItem(ACCESS_TOKEN));
    if (authToken)
        return {Authorization: `Bearer  + ${authToken}`};
    return {};
}