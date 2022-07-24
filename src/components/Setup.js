import ClickedArrow from "../images/ClickedArrow.svg";
import React from "react";
import Arrow from "../images/Arrow.svg";
import "../pages/dashboard/dashboard.css"

const Setup = ({active, icon, id, text, name, done, firstName, handleSetup, handleAction}) => {

    const onClickHandler = () => {
        handleSetup(name);
        handleAction(name);
    }

    return <div style={{display: done === true ? "none" : "flex"}} className={active ? "onboard_setup active" : "onboard_setup"} key={id}
                onClick={onClickHandler}>
        <img src={icon} alt="setup action icon"/>
        <p className="setup_action">Hey {firstName}, {text}</p>
        <button>
            get started
            <img src={active ? ClickedArrow : Arrow} alt="button icon"/>
        </button>
    </div>;
}

export default Setup;