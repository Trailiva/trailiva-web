import React, {useEffect} from 'react';
import Register from "./pages/auth/register/Register";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/auth/login/Login";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import Verification from "./pages/auth/verificationPage/Verification";
import ToVerify from "./pages/auth/verificationPage/ToVerify";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateWorkspace from "./pages/workspace/personal/CreateWorkspace";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {

    return (
        <Routes>
            <Route exact path='/' element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
            }/>
            <Route exact path="login" element={<Login/>}/>

            <Route path="create-workspace" element={
                <ProtectedRoute>
                    <CreateWorkspace/>
                </ProtectedRoute>
            }/>
            <Route path="user-verification/:token" element={
                <ProtectedRoute>
                    <Verification/>
                </ProtectedRoute>
            }/>

            <Route path="register" element={<Register/>}/>
            <Route exact path="to-verify" element={<ToVerify/>}/>

            <Route path="forget-password" element={<ForgetPassword/>}/>
            <Route path="reset-password" element={
                <ProtectedRoute>
                    <ResetPassword/>
                </ProtectedRoute>
            }/>

            <Route exact path="*" element={<PageNotFound/>}/>
        </Routes>

    );
}

export default App;
