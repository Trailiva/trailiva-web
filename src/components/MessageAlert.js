import {Alert, Snackbar} from "@mui/material";
import React from "react";

const MessageAlert = (props: { messageModal: { horizontal: string; vertical: string; open: boolean }, onClose: () => void, errorData: string }) => {
    return <Snackbar
        autoHideDuration={6000}
        open={props.messageModal.open}
        onClose={props.onClose}
        anchorOrigin={{vertical: props.messageModal.vertical, horizontal: props.messageModal.horizontal}}
    >
        <Alert sx={{width: "400px", textAlign: "center"}} variant="filled" severity="error">
            {props.errorData}
        </Alert>
    </Snackbar>;
}

export default MessageAlert;