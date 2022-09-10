import Logo from "../images/Frame 416.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CustomButton from "./Buttons/CustomButton";
import { useNavigate } from "react-router-dom";

const Navbar = ({ text, path, none }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      style={{
        background: "transparent",
        boxShadow: "none",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
      >
        <Box
          component="img"
          sx={{ height: 18, cursor: "pointer" }}
          alt="Logo"
          src={Logo}
          onClick={() => {
            navigate("/");
          }}
        />
        <CustomButton
          text={{ value: text }}
          variant={"secondary"}
          color={"rgba(55, 84, 219, 1)"}
          size={"sm"}
          sx={{ padding: "0.4rem 1.5rem", textTransform: "capitalize", display: none ? "none" : null}}
          handleClick={() => {
            navigate(path);
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
