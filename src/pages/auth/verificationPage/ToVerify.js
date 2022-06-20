import React, {useState} from 'react';
import Navbar from "../../../components/Navbar";
import {AlertTitle, Alert} from "@mui/lab";
import { makeStyles } from "@material-ui/core/styles";
import {CheckRounded} from "@mui/icons-material";
import {Snackbar} from "@mui/material";

const ToVerify = () => {
	const snackbar = makeStyles({
		snackbar:{
			"&.MuiSnackbar-root":{
				position: "static",
				transform: "translateX(0)"
			}
		}
	})
	const useStyles = makeStyles({
		cookieAlert: {
			"&.MuiPaper-root":{
				justifyContent: "space-between",
				alignItems: 'flex-start',
				padding: '1rem',
				background: '#FAFFFD',
				borderRadius: '12px',
				border: '1.6px solid #00C271'
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
				alignItems: 'flex-start',
				borderRadius: '50%',
				background: '#E6FFF4',
			}
		}
	});

	const [open, setOpen] = React.useState(true);
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		setOpen(false);
	};

	const classes = useStyles()
	const snackClasses = snackbar()
	localStorage.setItem('username','Mona')
	const [username, setUsername] = useState(localStorage.getItem('username'))

	return (
		<>
			<Navbar path="/login" text="Login"/>
			<header className="verification_header">
				<div>
					<h3>Verify Your Account</h3>
					<p>Your account has been created successfully.  A <br/> verification link has been sent to your registered email <br/> address.</p>
				</div>

				<Snackbar
					className={snackClasses.snackbar}
					open={open}
					// autoHideDuration={6000}
					anchorOrigin={{horizontal: "center", vertical: "bottom"}}
					onClose={handleClose}
				>
					<Alert severity="success" onClose={handleClose} icon={<CheckRounded fontSize={"inherit"} />}  className={classes.cookieAlert}>
						<AlertTitle>Hello {username}</AlertTitle>
						You would be sent a recovery Link to the email
					</Alert>
				</Snackbar>
			</header>
		</>
	);
};

export default ToVerify;