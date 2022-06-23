import React from 'react';
import {IconButton} from '@mui/material';
import {LoadingButton} from "@mui/lab";
import {makeStyles} from "@material-ui/core/styles";

const CustomButton = (
	props: {
		handleClick: ()=> void;
		text?: Object;
		color?: string;
		variant?: string;
		size?: string;
		children?: any;
		href?: string;
		loading?: Object;
		icon?: [position, value];
		label?: string;
		disabled?: boolean;
	}) => {


	const backgroundColor = props.color
	const textColor = props.text.color ? props.text.color : "white"
	const loading = makeStyles({
		loadingButton: {
			borderRadius: "8px",
			"&.MuiButton-contained": {
				backgroundColor: backgroundColor,
				color: textColor,
				fontWeight: 'initial',
				border: "none",
			},
			"&.MuiButton-sizeSmall": {
				width: "188px",
				height: "40px"
			},
			"&.MuiButton-sizeMedium": {
				width: "188px",
				height: "48px"
			},
			"&.MuiButton-sizeLarge": {
				width: "188px",
				height: "56px"
			},
			"&.MuiButton-outlined": {
				borderColor: backgroundColor,
				color: backgroundColor,
				fontWeight: 'initial',
			},
			"&.MuiButton-text": {
				color: props.color,
				fontWeight: 'initial',
				border: "none",
			},
			"&.MuiButton-contained:hover": {
				backgroundColor: backgroundColor,

			},
			"&:hover": {
				transform: "scale(1.04, 1.08)",
			},
			"&.Mui-disabled": {
				opacity: .4,
				// backgroundColor: "initial",
				color: "white",
			}
		},
		loadingIcon: {
			transform: "rotate(360)",
			transition: "transform 150ms ease",
		}
	})

	const classes = loading()
	const variant = props.variant === "primary" ? "contained" : props.variant === "secondary" ? "outlined" : props.variant === "tertiary" && "text"
	const startIcon = props.icon[0] === 'start' && props.icon[1];
	const endIcon = props.icon[0] === 'end' && props.icon[1];
	return (
		<>
			{props.text && props.icon &&
				<LoadingButton
					className={`${classes.loadingButton} ${classes.loadingIcon}`}
					disableElevation
					loading={props.loading.status}
					loadingPosition={(props.icon[0] && props.loading.position) ? props.icon[0] : (props.loading.position && !props.icon) && props.loading.position}
					loadingIndicator={props.loading.indicator}
					variant={variant}
					size={props.size}
					onClick={props.handleClick}
					href={props.href}
					disabled={props.disabled}
					startIcon={startIcon}
					endIcon={endIcon}
				>
					{props.text.value}
				</LoadingButton>}
			{props.text && !props.icon &&
				<LoadingButton
					className={`${classes.loadingButton} ${classes.loadingIcon}`}
					disableElevation
					loading={props.loading.status}
					variant={variant}
					size={props.size}
					onClick={props.handleClick}
					href={props.href}
					disabled={props.disabled}
					startIcon={startIcon}
					endIcon={endIcon}
				>
					{props.text.value}
				</LoadingButton>}
			{!props.text && props.icon &&
				<IconButton
					variant={props.variant}
					onClick={props.handleClick}
					size={props.size}
					color={props.color}
				>
					{props.icon[1]}
				</IconButton>}
		</>);
}
CustomButton.defaultProps = {
	text: "",
	color: "primary",
	variant: "filled",
	children: "",
	icon: ["", ""],
	loading: {
		status: false,
		indicator: '',
	},
	size: "large",
	disabled: false
}
export default CustomButton;