import React from 'react';
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";

const ClickableButton = ({text, to}) => {
    return <Link to={to} className="login_btn">{text}</Link>;
}

ClickableButton.propTypes = {
    to: PropTypes.any,
    text: PropTypes.any
};

export default ClickableButton;