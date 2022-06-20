import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
// import {handleResetVerificationToken} from "../../../api/ApiUtils";
// import {useNavigate} from "react-router-dom";
import {AlertTitle, Alert} from "@mui/lab";
import { makeStyles } from "@material-ui/core/styles";
import {WarningAmberRounded} from "@mui/icons-material";

const ToVerify = () => {
	const useStyles = makeStyles({
		cookieAlert: {
			"&.MuiPaper-root":{
				justifyContent: "space-between",
				alignItems: 'center',
				padding: '1rem'
			},
			"&.MuiAlert-message":{
				width:"60%",
				margin:'2rem'
			},
			"& .MuiAlert-icon": {
				fontSize: 40,
				width: 'max-content',
				padding: '20px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: '50%',
				background: 'rgba(250, 174, 5, 0.08)',
			}
		}
	});

	const classes = useStyles()
	localStorage.setItem('username','Mona')
	const [username, setUsername] = useState(localStorage.getItem('username'))
	const [message, setMessage] = useState("Your account has been created successfully.  A verification\n" +
		"link has been sent to your registered email address.");
	const navigate = useNavigate();

	// const handleResendToken = async () => {
	//     try {
	//         const res = await handleResetVerificationToken();
	//         console.log(res.data);
	//         setIcon(ResendIcon);
	//         setMessage(res.data.message);
	//     } catch (err) {
	//         console.log(err.request);
	//         console.log(err.response);
	//         navigate("/login")
	//     }
	// }

	return (
		<>
			<Navbar path="/login" text="Login"/>
			<header className="verification_header">
				<div>
					<h3>Verify Your Account</h3>
					<p>{message}</p>
				</div>

				<Alert severity="warning" icon={<WarningAmberRounded fontSize={"inherit"} />}  className={classes.cookieAlert}>
					<AlertTitle>Hello {username}</AlertTitle>
					You would be sent a recovery Link to the email
				</Alert>
			</header>
		</>
	);
};

export default ToVerify;