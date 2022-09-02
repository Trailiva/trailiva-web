import React from "react";
import Logo from "../images/Frame 416.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CustomButton from "./Buttons/CustomButton";
import {useNavigate} from "react-router-dom";


const Navbar = ({text, path}) => {
    const navigate = useNavigate();
    return (
        <AppBar position="static"
                style={{background: 'transparent', boxShadow: 'none', maxWidth: "1200px", margin: "0.5rem auto"}}>
            <Toolbar sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Box
                    component="img"
                    sx={{height: 18, cursor: "pointer"}}
                    alt="Logo"
                    src={Logo}
                    onClick={() => {
                        navigate("/")
                    }}
                />
                <CustomButton
                    text={{value: text}}
                    variant={"secondary"}
                    color={"rgba(55, 84, 219, 1)"}
                    size={"sm"}
                    sx={{padding: "0.2rem 1.5rem", textTransform: "capitalize"}}
                    href={path}
                />
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
