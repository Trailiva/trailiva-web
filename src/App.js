import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Verification from "./pages/auth/verificationPage/Verification";
import Register from "./pages/auth/register/Register";
import ToVerify from "./pages/auth/verificationPage/ToVerify";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import PageNotFound from "./components/PageNotFound";
import CreateWorkspace from "./pages/workspace/personal/CreateWorkspace";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import {ToastContainer} from "react-toastify";

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
                <Route path="user-verification/:token" element={<Verification/>}/>

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
