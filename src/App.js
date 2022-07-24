import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Verification from "./pages/auth/verificationPage/Verification";
import Register from "./pages/auth/register/Register";
import ToVerify from "./pages/auth/verificationPage/ToVerify";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import PageNotFound from "./components/PageNotFound";
import {ToastContainer} from "react-toastify";
import CreateWorkspace from "./pages/workspace/personal/CreateWorkspace";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/auth/login/Login";
import CustomButton from "./components/Buttons/CustomButton";

function App() {
    return (
        <>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard/>
                        </ProtectedRoute>
                    }
                />
                <Route exact path="login" element={<Login/>}/>
                <Route
                    path="create-workspace"
                    element={
                        <ProtectedRoute>
                            <CreateWorkspace/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="user-verification/:token"
                    element={
                        <ProtectedRoute>
                            <Verification/>
                        </ProtectedRoute>
                    }
                />

                <Route path="register" element={<Register/>}/>
                <Route exact path="to-verify" element={<ToVerify/>}/>

                <Route path="forget-password" element={<ForgetPassword/>}/>
                <Route
                    path="reset-password"
                    element={
                        <ProtectedRoute>
                            <ResetPassword/>
                        </ProtectedRoute>
                    }
                />
                <Route exact path="*" element={<PageNotFound/>}/>
            </Routes>
            <ToastContainer/>
        </>
    );
}

export default App;