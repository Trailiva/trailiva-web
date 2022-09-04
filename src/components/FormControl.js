import * as PropTypes from "prop-types";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const FormControl = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => setPasswordShown(!passwordShown);

  return (
    <div className="form-control">
      <label htmlFor="password">{props.label}</label>
      <div className="input-container">
        <input
          type={
            props.visibility
              ? passwordShown
                ? "text"
                : "password"
              : props.type
          }
          name={props.name}
          placeholder={props.placeholder}
          {...props.useForm_register_return}
        />
        {props.visibility &&
          (passwordShown ? (
            <Visibility onClick={togglePassword} />
          ) : (
            <VisibilityOff onClick={togglePassword} />
          ))}
      </div>

      <small className="input_message">
        {props.errors[props.name] && props.errors[props.name].message}
      </small>
    </div>
  );
};

FormControl.propTypes = {
  label: PropTypes.string,
  type: PropTypes.bool,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  visibility: PropTypes.bool,
  useForm_register_return: PropTypes.object,
  errors: PropTypes.shape({}),
};

export default FormControl;
