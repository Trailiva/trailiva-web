import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {CircularProgress} from "@mui/material";
import {WORKSPACE_ID} from "../constants";
import {getUserWorkspaces} from "../services/workspaceService";

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
    const [workspaces, setWorkspaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleUserWorkspace = async () => {
        try {
            const response = await getUserWorkspaces();
            console.log(response.data.workSpaces);
            setWorkspaces([...response.data.workSpaces]);
            setIsLoading(false);
        } catch (e) {
            console.log("Error", e)
            setIsLoading(false);
        }
    }

    const switchWorkspace = e => {
        const id = e.currentTarget.id;
        if (localStorage.getItem(WORKSPACE_ID) !== id) {
            localStorage.setItem(WORKSPACE_ID, id);
            window.location.reload();
        }
    }


    useEffect(() => {
        handleUserWorkspace();
    }, [])

    return (
        isLoading ? <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh"
            }}>
                <CircularProgress/>
            </div>
            :
            <div style={{
                height: "100%",
                backgroundColor: "#3754DB",
                width: "100%",
                padding: "100px 10px",
                color: "white"
            }}>
                {workspaces.map(workspace => (
                    <Box key={workspace.workspaceId}
                         sx={{
                             height: "48px",
                             width: "48px",
                             margin: "1rem auto",
                             border: "0.7px solid white",
                             borderRadius: "8px",
                             display: "flex",
                             justifyContent: "center",
                             alignItems: "center"
                         }}
                    >

                        <Box
                            id={workspace.workspaceId}
                            sx={{
                                height: "38px",
                                width: "38px",
                                backgroundColor: "white",
                                borderRadius: "8px",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                            onClick={switchWorkspace}
                        >
                            <Typography key={workspace.id} sx={{
                                color: "#3754DB",
                                lineHeight: "2.5rem",
                                fontWeight: "bolder"
                            }}>{workspace.referenceName}</Typography>
                        </Box>

                    </Box>
                ))}

                <CreateWorkspaceButton/>
            </div>
    );
};

export default Account;