import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/Frame 416.svg";
import ClickableButton from "./ClickableButton";

const Navbar = ({ text, path }) => {
  return (
    <nav className="nav_bar">
      <Link to="/" className="logo-name">
        <img src={Logo} alt="logo" />
      </Link>
      <ClickableButton to={path} text={text} />
    </nav>
  );
};

export default Navbar;
