import React, { useState, useEffect } from 'react';
import Navbar from "../../../components/Navbar";
import { CheckRounded } from "@mui/icons-material";
import { toast } from 'react-toastify'

function VerificationMessage(props) {
	return (
		<>
			<h3 style={{
				color: '#00C271'
			}}>Hello {props.username}</h3>
			<p style={{
				fontSize: "12px",
				color: '#017042',
			}}>You would be sent a recovery Link to the email</p>
		</>
	)
}

const ToVerify = () => {
	localStorage.setItem('username', 'Mona')
	const [username, setUsername] = useState(localStorage.getItem('username'))

	const notify = () => {
		toast(<VerificationMessage username={username} />, {
			position: 'bottom-center',
			autoClose: false,
			icon: <CheckRounded fontSize={"inherit"} />,
			hideProgressBar: true,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
	}

	useEffect(() => {
		notify()
	}, []);

	return (
		<>
			<Navbar path="/login" text="Login" />
			<header className="verification_header">
				<div>
					<h3>Verify Your Account</h3>
					<p>Your account has been created successfully.  A <br /> verification link has been sent to your registered email <br /> address.</p>
				</div>
			</header>
		</>
	);
};

export default ToVerify;