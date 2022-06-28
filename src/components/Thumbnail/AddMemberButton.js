import React from 'react';
import {Avatar} from "@mui/material";
import AddUserIcon from "../../images/Add User.svg";

const AddMemberButton = ({handler}) => {
    return (
        <Avatar onClick={handler}
                sx={
                    {bgcolor: "#EBEFFF", cursor: "pointer"}
                }
                src={AddUserIcon}
                variant="square"
        />
    );
};

export default AddMemberButton;