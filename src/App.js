import React, {useEffect, useState} from 'react';
import Register from "./pages/auth/register/Register";
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./pages/auth/login/Login";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import Verification from "./pages/auth/verificationPage/Verification";
import ToVerify from "./pages/auth/verificationPage/ToVerify";
import PageNotFound from "./components/PageNotFound";
import CreateWorkspace from "./pages/workspace/personal/CreateWorkspace";
import Dashboard from "./pages/dashboard/Dashboard";
import {getCurrentUser} from "./api/ApiUtils";
import {ACCESS_TOKEN} from "./constants";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    const INITIAL_USER = {
        currentUser: null,
        isAuthenticated: false,
        isLoading: true
    }
    const [user, setUser] = useState(INITIAL_USER);

    const handleLogout = (redirectTo = "/login", notificationType = "success", description = "You're successfully logged out.") => {
        localStorage.removeItem(ACCESS_TOKEN);
        setUser(INITIAL_USER);
    }

    const loadCurrentUser = () => {
        getCurrentUser().then(response => {
            setUser({
                currentUser: response.data,
                isAuthenticated: true,
                isLoading: false
            })
            console.log(response.data)
        }).catch(error => {
            console.log(error)
            setUser({isLoading: false})
        })
    }

    const handleLogin = () => {
        loadCurrentUser();
    }

    useEffect(() => {
        console.log("Got Here")
        console.log()
        loadCurrentUser();
    }, [])

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute user={user.currentUser}>
                <Dashboard/>
            </ProtectedRoute>}/>

            <Route path="create-workspace" element={
                <ProtectedRoute user={user.currentUser}>
                    <CreateWorkspace/>
                </ProtectedRoute>}/>
            }/>
            <Route path="user-verification/:token" element={
                <ProtectedRoute user={user.currentUser}>
                    <Verification/>
                </ProtectedRoute>}/>
            }/>
            <Route path="register" element={<Register/>}/>
            <Route path="login" element={<Login/>}/>
            <Route exact path="to-verify" element={<ToVerify/>}/>

            <Route path="forget-password" element={<ForgetPassword/>}/>
            <Route path="reset-password" element={<ResetPassword/>}/>

            <Route exact path="*" element={<PageNotFound/>}/>
        </Routes>

    );
}

export default App;
