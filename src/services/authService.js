import {api} from "../api/api";


 const register =  async (userData) => {
    const response = await api.post("/auth/register", userData);
    if (response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
}

const login = async (userData) => {
     const response = await api.post("/auth/login", userData);
     if (response.data)
         localStorage.setItem("accessToken", response.data.jwtToken);
     return response;
}

const logout = () => {
     if (localStorage.getItem("accessToken")) localStorage.removeItem("accessToken");
}

const authService = {
    register,
    logout,
    login
}

export  default authService;

