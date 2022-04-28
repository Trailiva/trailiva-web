import React from 'react';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";

function CreateWorkspaceButton() {
    const navigate = useNavigate();
    const createWorkspace = () => {
        navigate("create-workspace");
    }
    
    return <Box
        onClick={createWorkspace}
        sx={{
        height: "38px",
        width: "38px",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        margin: "15px auto",
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "rgba(255, 255, 255, 0.6)",
        cursor: "pointer"
    }}>
        +
    </Box>;
}

const Account = () => {
    return (
        <div style={{
            height: "100%",
            backgroundColor: "#3754DB",
            width: "100%",
            padding: "100px 10px",
            color: "white"
        }}>
            <Box sx={{
                height: "48px",
                width: "48px",
                margin: "0 auto",
                border: "0.7px solid white",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>


                <Box sx={{
                    height: "38px",
                    width: "38px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    textAlign: "center"
                }}>
                    <Typography sx={{
                        color: "#3754DB",
                        lineHeight: "2.5rem",
                        fontWeight: "bolder"
                    }}>TR</Typography>
                </Box>

            </Box>

            <CreateWorkspaceButton/>
        </div>
    );
};

export default Account;