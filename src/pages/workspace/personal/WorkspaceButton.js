import Checked from "../../../images/check.svg";
import * as PropTypes from "prop-types";
import React, {useState} from "react";

const WorkspaceButton = (props) => {

    const selectedStyle = {
        border: "3px solid #6684FF",
    }
    const checkedStyle = {
        position: "absolute",
        left: "120px",
        top: "15px"
    }

    console.log(props.current);

    const handleSelectedWorkspace = e => {
        e.preventDefault();
        props.onHandleSpaceType(props.current);
    }

    return <button className="personal" onChange={props.onChange} onClick={handleSelectedWorkspace}
                   style={props.selected ? selectedStyle : null} name={props.name}>
        {props.selected && <img src={Checked} alt="checked icon" style={checkedStyle}/>}
        <img src={props.icon} alt="personal icon"/>
        <p>{props.usage}</p>
        <small>{props.description}</small>
    </button>;
}

WorkspaceButton.propTypes = {
    usage: PropTypes.string,
    icon: PropTypes.any,
    description: PropTypes.string,
    name: PropTypes.string,
    current: PropTypes.string,
    selected: PropTypes.bool,
    onHandleSpaceType: PropTypes.func,
    onClick:PropTypes.func
};

export default WorkspaceButton;