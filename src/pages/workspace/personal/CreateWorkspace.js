import "./personal.css";
import React, { useEffect, useReducer, useState } from "react";
import Office from "../../../images/office.svg";
import Profile from "../../../images/profile.svg";
import Checked from "../../../images/check.svg";
import CheckedProfile from "../../../images/checkedProfile.svg";
import CheckedOffice from "../../../images/checkOffice.svg";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/Buttons/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createWorkspaceHandler } from "../../../store/workspace-action";
import { workspaceAction } from "../../../store/workspace-slice";
import Navbar from "../../../components/Navbar";
import IsInputComponent from "../../../components/InputFields/IsInputComponent";
import { useForm } from "react-hook-form";
import { registrationOption } from "../../../utils/formValidation";
import IsTextareaComponent from "../../../components/InputFields/IsTextareaComponent";

const CreateWorkspace = () => {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState(false);
  const [step, setStep] = useState(1);
  const [workspaceType, setWorkspaceType] = useState("");
  const dispatchFn = useDispatch();
  const errorMessage = useSelector((state) => state.workspace.errorMsg);
  const isSuccessful = useSelector((state) => state.workspace.isSuccessful);
  const errorStatus = useSelector((state) => state.workspace.errorStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
    if (isSuccessful) navigate("/create-project");
    if (errorStatus === 401) navigate("/create-workspace");
    return () =>
      setTimeout(() => dispatchFn(workspaceAction.setErrorMsg("")), 5000);
  }, [errorMessage, isSuccessful, dispatchFn]);

  const createWorkspace = async (data) => {
    const formData = {
      name: data.name,
      description: data.description,
      workSpaceType: workspaceType,
    };
    dispatchFn(createWorkspaceHandler(formData));
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const Continue = () => {
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const getForm = () => {
    const selectedStyle = {
      border: "3px solid #6684FF",
    };
    const checkedStyle = {
      position: "absolute",
      left: "120px",
      top: "15px",
    };

    const selectedButton = (e) => {
      e.preventDefault();
      setSelected(true);
      setChecked(false);
      setWorkspaceType("OFFICIAL");
    };

    const checkedButton = (e) => {
      e.preventDefault();
      setChecked(true);
      setSelected(false);
      setWorkspaceType("PERSONAL");
    };

    switch (step) {
      case 1:
        return (
          <div className="title-form-box">
            <h3>
              create a <span>workspace</span>
            </h3>
            <IsInputComponent
              label="Title your workspace"
              name="name"
              type="text"
              control={control}
              placeholder="Trailiva Project"
              validation={registrationOption.workspace_title}
            />
            <CustomButton
              text={{ value: "next" }}
              handleClick={handleSubmit(Continue)}
              fullWidth={true}
              variant={"primary"}
              color={"rgba(55, 84, 219, 1)"}
              size={"sm"}
              sx={{ marginTop: "2rem", textTransform: "capitalize" }}
            />
          </div>
        );
      case 2:
        return (
          <div className="workspace-choice-box">
            <h3>
              Why do you need the <span>workspace</span>
            </h3>
            <div className="workspace_type">
              <button
                onClick={checkedButton}
                style={checked ? selectedStyle : null}
              >
                {checked && (
                  <img
                    src={Checked}
                    alt="checked icon"
                    className="checked-img"
                  />
                )}
                <img
                  src={checked ? CheckedProfile : Profile}
                  alt="personal icon"
                />
                <p style={checked ? { color: "#3754DB" } : null}>
                  personal use
                </p>
                <small>some description of the purpose"</small>
              </button>

              <button
                onClick={selectedButton}
                style={selected ? selectedStyle : null}
              >
                {selected && (
                  <img
                    src={Checked}
                    alt="checked icon"
                    className="checked-img"
                  />
                )}
                <img
                  src={selected ? CheckedOffice : Office}
                  alt="official icon"
                />
                <p style={selected ? { color: "#3754DB" } : null}>
                  official use
                </p>
                <small>some description of the purpose"</small>
              </button>
            </div>
            <div className="step_btn">
              <CustomButton
                text={{ value: "prev" }}
                handleClick={Previous}
                variant={"primary"}
                color={"rgba(55, 84, 219, 1)"}
                size={"sm"}
                sx={{ marginTop: "2rem", textTransform: "capitalize" }}
              />
              <CustomButton
                text={{ value: "next" }}
                disabled={!(selected || checked)}
                handleClick={Continue}
                variant={"primary"}
                color={"rgba(55, 84, 219, 1)"}
                size={"sm"}
                sx={{ marginTop: "2rem", textTransform: "capitalize" }}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="workspace-description-box">
            <h3>Describe workspace</h3>
            <IsTextareaComponent
              label="Description of what your workspace is for."
              name="description"
              control={control}
              placeholder="Trailiva Project"
              multiline={true}
              rows={5}
              validation={registrationOption.work_space}
            />
            <div className="step_btn">
              <CustomButton
                text={{ value: "prev" }}
                handleClick={Previous}
                variant={"primary"}
                color={"rgba(55, 84, 219, 1)"}
                size={"sm"}
                sx={{ marginTop: "2rem", textTransform: "capitalize" }}
              />
              <CustomButton
                text={{ value: "create workspace" }}
                handleClick={handleSubmit(createWorkspace)}
                variant={"primary"}
                color={"rgba(55, 84, 219, 1)"}
                size={"sm"}
                sx={{ marginTop: "2rem", textTransform: "capitalize" }}
              />
            </div>
          </div>
        );
      default:
        return <div>Hello world</div>;
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="form_container">
        <form className="form_wrapper" noValidate>
          {getForm()}
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspace;
