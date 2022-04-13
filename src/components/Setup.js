import ClickedArrow from "../images/ClickedArrow.svg";
import React from "react";
import Arrow from "../images/Arrow.svg";
import "../pages/dashboard/dashboard.css"

const Setup = ({active, icon, key, onChecked, text, name, onUpload, firstName}) => {
    const uploadImage = () => {
        onChecked(name)
        onUpload()
    }
    return <div className={active ? "onboard_setup active" : "onboard_setup"} key={key}
                onClick={uploadImage}>
        <img src={icon} alt="setup action icon"/>
        <p className="setup_action">Hey {firstName}, {text}</p>
        <button>
            get started
            <img src={active ? ClickedArrow : Arrow} alt="button icon"/>
        </button>
    </div>;
}

export default Setup;