import React from "react";
import * as PropTypes from "prop-types";



const AuthButton = ({disabled, text, loadingText}) => {
    const disabledStyle = {
        background: disabled && "rgb(51, 78, 218, 0.6)",
        cursor: disabled && "none"
    }

    return <button className="form-button"
                   type="submit"
                   disabled={disabled}
                   style={disabledStyle}>
        {disabled && (
            <i className="fa fa-refresh fa-spin" style={{marginRight: "5px"}}/>
        )}
        {disabled && <span>{loadingText}</span>}
        {!disabled && <span>{text}</span>}
    </button>;
}

AuthButton.propTypes = {disabled: PropTypes.bool};
export default AuthButton;