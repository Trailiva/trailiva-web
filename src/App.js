import React from 'react';
import {ToastContainer} from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "../src/pages/dashboard/Dashboard";
import {Route, Routes} from "react-router-dom";
import Verification from "./pages/auth/verificationPage/Verification";
import Register from "./pages/auth/register/Register";
import ToVerify from "./pages/auth/verificationPage/ToVerify";
import ForgetPassword from "./pages/auth/forgetPassword/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword/ResetPassword";
import PageNotFound from "./components/PageNotFound";
import Login from "./pages/auth/login/Login";
import CreateWorkspace from "./pages/workspace/personal/CreateWorkspace";
import {Stack} from "@mui/material";
import CustomButton from "./components/Buttons/CustomButton";
import {Cached, Save, ScreenRotationRounded} from "@material-ui/icons";
import {LoadingButton} from "@mui/lab";
import {semantic, primary, accent} from "./constants/colors";


function App() {
	return (
		<>
			<Routes>
				<Route exact path="buttons" element={
					<Stack direction={'row'} spacing={'10px'}>
						<CustomButton
							handleClick={() => console.log('clicked')}
							color={primary.yellow}
							loading={
								{
									status: false,
									indicator: <Cached/>
								}
							}
							variant={"secondary"}
							text={
								{
									value: "Button",
									color: primary.blue
								}
							} size={"large"}
							icon={['start', <ScreenRotationRounded/>]}/>
						<CustomButton handleClick={() => console.log('clicked')} variant={"primary"}
									  color={primary.yellow}
									  text={{value: "Button", color: semantic.error}}
									  size={"medium"}/>
						<CustomButton handleClick={() => console.log('clicked')} variant={"secondary"}
									  color={primary.blue}
							// disabled={true}
									  text={{value: "Button", color: semantic.error}}
									  size={"small"}/>
						<CustomButton handleClick={() => console.log('clicked')} variant={"primary"} size={"large"}
									  icon={['start', <ScreenRotationRounded/>]}/>

						<CustomButton handleClick={() => console.log('clicked')}
									  icon={['start', <ScreenRotationRounded/>]}/>
					</Stack>
				}></Route>
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
