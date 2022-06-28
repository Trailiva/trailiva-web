import React from 'react';
import {Routes, Route} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import {Dashboard} from "@material-ui/icons";

import Verification from "./pages/auth/verificationPage/Verification";
import CreateWorkspace from "./pages/workspace/personal/CreateWorkspace";
import ToVerify from "./pages/auth/verificationPage/ToVerify";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import Register from "./pages/auth/register/Register";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import PageNotFound from "./components/PageNotFound";
import {ToastContainer} from "react-toastify";
import {Login} from "@mui/icons-material";

import { useForm, FormProvider } from "react-hook-form";

function App() {
    return (
        <>
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
            <ToastContainer/>


        </>);

}

export default App;
