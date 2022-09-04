import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from "@material-ui/core";
import './alertToast.css';
import SuccessOutline from '../images/successoutlined.svg'
import SuccessFilled from '../images/successfilled.svg'
import ErrorFilled from '../images/errorfilled.svg'
import ErrorOutlined from '../images/erroroutlined.svg'
import InfoFilled from '../images/infofilled.svg'
import InfoOutlined from '../images/infooutlined.svg'
import WarningFilled from '../images/warningfiled.svg'
import WarningOutlined from '../images/warningoutlined.svg'

const useStyles = makeStyles({
    myError: {
      backgroundColor: "#F7002B"
    },
    myWarning: {
        backgroundColor: "#FBBE37"
    },
    mySuccess: {
        backgroundColor: "#00C271"
    },
    myInfo: {
        backgroundColor: "#6684FF"
    }
  });

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });



function IsAlertToast({severity, variant, alertTitle, alertMessage, vertical, horizontal}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (severity === "success" && variant === "filled") {
    return (
        <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%', margin: '10px auto'}} spacing={2}>
        <Alert icon={<img alt="icon"  src={SuccessFilled} />} onClose={handleClose} variant={variant} severity={severity} className={classes.mySuccess}>
            <AlertTitle> {alertTitle} </AlertTitle>
            {alertMessage}
        </Alert>
      </Stack>
      </Snackbar>
    )
  } else if (severity === "success" && variant === "outlined") {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%', margin: '10px auto'}} spacing={2}>
        <Alert icon={<img alt="icon" src={SuccessOutline} />} onClose={handleClose} variant={variant} severity={severity} className={classes.mySuccess}>
            <AlertTitle> {alertTitle} </AlertTitle>
            {alertMessage}
        </Alert>
      </Stack>
      </Snackbar>
    )
  } else if (severity === "warning" && variant === "filled") {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%', margin: '10px auto'}} spacing={2}>
        <Alert icon={<img alt="icon" src={WarningFilled} />} onClose={handleClose} variant={variant} severity={severity} className={classes.myWarning}>
            <AlertTitle> {alertTitle} </AlertTitle>
            {alertMessage}
        </Alert>
      </Stack>
      </Snackbar>
    )
  } else if (severity === "warning" && variant === "outlined") {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%', margin: '10px auto'}} spacing={2}>
        <Alert icon={<img alt="icon" src={WarningOutlined} />} onClose={handleClose} variant={variant} severity={severity} className={classes.myWarning}>
            <AlertTitle> {alertTitle} </AlertTitle>
            {alertMessage}
        </Alert>
      </Stack>
      </Snackbar>
    )
  }  else if (severity === "info" && variant === "filled") {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%', margin: '10px auto'}} spacing={2}>
        <Alert icon={<img alt="icon" src={InfoFilled} />} onClose={handleClose} variant={variant} severity={severity} className={classes.myInfo}>
            <AlertTitle> {alertTitle} </AlertTitle>
            {alertMessage}
        </Alert>
      </Stack>
      </Snackbar>
    )
  } else if (severity === "info" && variant === "outlined") {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%', margin: '10px auto'}} spacing={2}>
        <Alert icon={<img alt="icon" src={InfoOutlined} />} onClose={handleClose} variant={variant} severity={severity} className={classes.myInfo}>
            <AlertTitle> {alertTitle} </AlertTitle>
            {alertMessage}
        </Alert>
      </Stack>
      </Snackbar>
    )
  }  else if (severity === "error" && variant === "filled") {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%', margin: '10px auto'}} spacing={2}>
        <Alert icon={<img alt="icon" src={ErrorFilled} />} onClose={handleClose} variant={variant} severity={severity} className={classes.myError}>
            <AlertTitle> {alertTitle} </AlertTitle>
            {alertMessage}
        </Alert>
      </Stack>
      </Snackbar>
    )
  } else if (severity === "error" && variant === "outlined") {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Stack sx={{ width: '100%', margin: '10px auto'}} spacing={2}>
        <Alert icon={<img alt="icon" src={ErrorOutlined} />} onClose={handleClose} variant={variant} severity={severity} className={classes.myError}>
            <AlertTitle> {alertTitle} </AlertTitle>
            {alertMessage}
        </Alert>
      </Stack>
      </Snackbar>
    )
  }
}

export default IsAlertToast