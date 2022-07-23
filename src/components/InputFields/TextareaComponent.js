import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import classes from "./IsTextareaComponent.module.css";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";

const TextareaComponent = (props) => {
  const CssTextField = styled(TextField)({
    "& .MuiFormHelperText-root": {
      margin: ".3rem 0rem",
    },
    "& .MuiOutlinedInput-root": {
      display: "flex",
      alignItems: "flex-start",
      borderRadius: ".8rem",
      overflow: "hidden",

      "& fieldset": {
        zIndex: "-1",
      },

      "& fieldset:hover": {
        border: "none",
      },

      "&.Mui-focused:not(.Mui-error) textarea": {
        caretColor: "#2746D8",
      },

      "&.Mui-focused:not(.Mui-error) fieldset": {
        border: "1px solid #2746D8",
        backgroundColor: "#FBFBFE",
        outline: "none",
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

      "&.Mui-error textarea": {
        color: "red",
      },
      "& .MuiInputAdornment-root .MuiButtonBase-root": {
        marginTop: "1.5rem",
        padding: "0",
      },
    },
  });

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
      }) => (
        <div
          className={`${classes.input} ${isDirty ? classes.filledInput : null}`}
        >
          <label className={props.disable ? classes.disabled : undefined}>
            {props.label}
          </label>
          <CssTextField
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            multiline={props.multiline}
            rows={props.rows ? props.rows : 3}
            helperText={error?.message}
            size={"small"}
            type={"text"}
            disabled={props.disable}
            InputProps={
              error
                ? {
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
      )}
    />
  );
};

export default TextareaComponent;
