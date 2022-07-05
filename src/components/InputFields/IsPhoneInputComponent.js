import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { IconButton } from "@mui/material";
import "./IsPhoneInputComponent.css";
import { Controller } from "react-hook-form";

const PhoneInputComp = ({ control, name, label }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={(props) => (
        <div
          className={`${
            props.fieldState.isDirty
              ? "phone-input-inputFilled"
              : props.fieldState.error
              ? "phone-input-errorState"
              : null
          } `}
        >
          <label className={"phone-input-label"}>{label}</label>
          <div className="phone-input-container">
            <PhoneInput
              onChange={props.field.onChange}
              country={"ng"}
              enableSearch={true}
              value={props.field.value}
              inputProps={{
                id: name,
                name,
                required: true,
                autoComplete: "none",
                "data-testid": "input-id",
              }}
              containerClass={"phone-input-container-class"}
              inputClass={"phone-input-input"}
              specialLabel=""
            />
            {props.fieldState.error ? (
              <IconButton>
                <ErrorOutlineIcon
                  style={{
                    color: "#FB8315",
                    padding: "0px",
                    fontSize: "1.1rem",
                  }}
                />
              </IconButton>
            ) : null}
          </div>
          {props.fieldState.error ? (
            <small>Phone number is required.</small>
          ) : (
            ""
          )}
        </div>
      )}
      rules={{
        required: "number is required",
      }}
    />
  );
};

export default PhoneInputComp;
