import * as PropTypes from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
import classes from "./IsInputComponent.module.css";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const IsInputComponent = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const CssTextField = styled(TextField)({
    "& .MuiFormHelperText-root": {
      margin: "0rem",
      fontSize: ".6rem",
    },
    "& .MuiOutlinedInput-root": {
      padding: "0rem",
      borderRadius: ".8rem",
      overflow: "hidden",
      transition: "all .3s ease",

      "& fieldset": {
        width: "auto",
        zIndex: "-1",
      },
      "& input": {
        padding: ".8rem 1rem",
        display: "block",
        outline: "none",
        border: "none",
        fontSize: "16px !important",
      },

      "&.Mui-focused:not(.Mui-error) fieldset": {
        border: "1px solid #2746D8",
        backgroundColor: "#FBFBFE",
      },
      "&.Mui-focused:not(.Mui-error) input": {
        caretColor: "blue",
      },
      "&.Mui-disabled fieldset": {
        backgroundColor: "#F9FAFB",
        border: "none",
      },

      "&.Mui-error:not(.Mui-disabled) fieldset": {
        borderWidth: "1px",
        backgroundColor: "#FFFAFA",
      },

      "&.Mui-error:not(.Mui-disabled) .MuiInputAdornment-root .MuiButtonBase-root .MuiSvgIcon-root":
        {
          fill: "#FB8315",
        },
      "&.Mui-disabled .MuiInputAdornment-root .MuiButtonBase-root .MuiSvgIcon-root":
        {
          fill: "#B2B4BE",
        },

      "&.Mui-error input": {
        color: "red",
      },
    },
  });

  const togglePasswordVisibilty = () =>
    setPasswordShown((prevState) => !prevState);

  const Icon = (
    <IconButton>
      <ErrorOutlineIcon />
    </IconButton>
  );
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{
        ...props.validation,
      }}
      render={({
        field: { onChange, value },
        fieldState: { error, isDirty },
      }) => {
        return (
          <div
            className={`${classes.input} ${
              isDirty ? classes.filledInput : null
            }`}
          >
            <label className={props.disabled ? classes.disabled : undefined}>
              {props.label}
            </label>
            <CssTextField
              error={!!error}
              onChange={onChange}
              value={value}
              autoComplete={"off"}
              placeholder={props.placeholder}
              fullWidth
              disabled={props.disabled}
              helperText={props.disabled ? "" : error?.message}
              type={
                props.type === "password"
                  ? passwordShown
                    ? "text"
                    : "password"
                  : props.type
              }
              InputProps={
                props.type === "password"
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          {error ? (
                            (error && props.disabled && (
                              <IconButton onClick={togglePasswordVisibilty}>
                                {passwordShown ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            )) ||
                            Icon
                          ) : (
                            <IconButton onClick={togglePasswordVisibilty}>
                              {passwordShown ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }
                  : error
                  ? props.disabled
                    ? null
                    : {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton>
                              <ErrorOutlineIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                  : null
              }
            />
          </div>
        );
      }}
    />
  );
};

IsInputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  validation: PropTypes.object,
  // control: PropTypes.object,
};

export default IsInputComponent;
