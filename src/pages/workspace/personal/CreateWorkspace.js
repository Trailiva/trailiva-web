import "./personal.css";
import React, {useEffect, useReducer, useState} from "react";
import Office from "../../../images/office.svg";
import Profile from "../../../images/profile.svg";
import Checked from "../../../images/check.svg";
import CheckedProfile from "../../../images/checkedProfile.svg";
import CheckedOffice from "../../../images/checkOffice.svg";
import {useNavigate} from "react-router-dom";
import RegisterBackgroundImage from "../../../images/RegisterBackground.png";
import CustomButton from "../../../components/Buttons/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {createWorkspaceHandler} from "../../../store/workspace-action";
import {workspaceAction} from "../../../store/workspace-slice";

const isActionType = (action, actionType) => {
  return action.type === actionType;
}

const workspaceNameReducer = (state, action) => {
  if (isActionType(action, 'USER_INPUT')) {
    return {value: action.val, isValid: action.val.trim().length > 5};
  }
  return {value: '', isValid: false};
}
const workspaceDescriptionReducer = (state, action) => {
  if (isActionType(action, 'USER_INPUT')) {
    return {value: action.val, isValid: action.val.trim().length > 5};
  }
  return {value: '', isValid: false};
}

const CreateWorkspace = () => {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState(false);
  const [step, setStep] = useState(1);
  const [workspaceNameState, dispatchWorkspaceName] = useReducer(workspaceNameReducer, {value: '', isValid: null});
  const [workspaceDescriptionState, dispatchWorkspaceDescription] = useReducer(workspaceDescriptionReducer, {
    value: '',
    isValid: null
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [workspaceType, setWorkspaceType] = useState("");
  const dispatchFn = useDispatch();
  const loading = useSelector((state) => state.workspace.isLoading);
  const errorMessage = useSelector((state) => state.workspace.errorMsg);
  const isSuccessful = useSelector((state => state.workspace.isSuccessful))
  const errorStatus = useSelector((state => state.workspace.errorStatus))
  const navigate = useNavigate();

  const {isValid: workspaceNameIsValid} = workspaceNameState;
  const {isValid: workspaceDescription} = workspaceDescriptionState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(workspaceNameIsValid && workspaceDescription && workspaceType);
    }, 500);

    return () => clearTimeout(identifier);
  }, [workspaceDescription, workspaceNameIsValid, workspaceType]);

  useEffect(() => {
    if (errorMessage) toast.error(errorMessage);
    if (isSuccessful) navigate("/")
    if (errorStatus === 401) navigate("/login")
    return () => setTimeout(()=> dispatchFn(workspaceAction.setErrorMsg("")), 5000)
  }, [errorMessage, isSuccessful, dispatchFn]);

  const createWorkspace = async (e) => {
    e.preventDefault();
    const formData = {
      name: workspaceNameState.value,
      description: workspaceDescriptionState.value,
      workSpaceType: workspaceType,
    }
    dispatchFn(createWorkspaceHandler(formData))
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const nextStep = () => setStep((prevStep) => prevStep + 1);

  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const Previous = (e) => {
    e.preventDefault();
    prevStep();
  };

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    if (name === "name") {
      dispatchWorkspaceName({type: 'USER_INPUT', val: value})
    } else if (name === "description") {
      dispatchWorkspaceDescription({type: 'USER_INPUT', val: value})
    }
  };


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
      setSelected(!selected);
      setChecked(false);
      setWorkspaceType("OFFICIAL");
    };

    const checkedButton = (e) => {
      e.preventDefault();
      setChecked(!checked);
      setSelected(false);
      setWorkspaceType("PERSONAL");
    };

    switch (step) {
      case 1:
        return (
            <div>
              <h3>
                create a <span>workspace</span>
              </h3>
              <label htmlFor="title">Title your workspace</label>
              <input
                  type="text"
                  name="name"
                  placeholder="Trailiva Project"
                  value={workspaceNameState.value}
                  onChange={handleOnChange}
              />

              <small
                  className="input_message">{!workspaceNameState.isValid && "Workspace name is required and it must contain 5 character"}</small>
              <CustomButton
                  text={{value: "next"}}
                  handleClick={Continue}
                  variant={"primary"}
                  color={"rgba(55, 84, 219, 1)"}
                  size={"sm"}
                  sx={{marginTop: "2rem", textTransform: "capitalize"}}
              />
            </div>
        );
      case 2:
        return (
            <div>
              <h3>
                Why do you need the <span>workspace</span>
              </h3>
              <div className="workspace_type">
                <button
                    onClick={checkedButton}
                    style={checked ? selectedStyle : null}
                >
                  {checked && (
                      <img src={Checked} alt="checked icon" style={checkedStyle}/>
                  )}
                  <img
                      src={checked ? CheckedProfile : Profile}
                      alt="personal icon"
                  />
                  <p style={checked ? {color: "#3754DB"} : null}>
                    personal use
                  </p>
                  <small>some description of the purpose"</small>
                </button>

                <button
                    onClick={selectedButton}
                    style={selected ? selectedStyle : null}
                >
                  {selected && (
                      <img src={Checked} alt="checked icon" style={checkedStyle}/>
                  )}
                  <img
                      src={selected ? CheckedOffice : Office}
                      alt="official icon"
                  />
                  <p style={selected ? {color: "#3754DB"} : null}>
                    official use
                  </p>
                  <small>some description of the purpose"</small>
                </button>
              </div>
              <div className="step_btn">
                <CustomButton
                    text={{value: "prev"}}
                    handleClick={Previous}
                    variant={"primary"}
                    color={"rgba(55, 84, 219, 1)"}
                    size={"sm"}
                    sx={{marginTop: "2rem", textTransform: "capitalize"}}
                />
                <CustomButton
                    text={{value: "next"}}
                    handleClick={Continue}
                    variant={"primary"}
                    color={"rgba(55, 84, 219, 1)"}
                    size={"sm"}
                    sx={{marginTop: "2rem", textTransform: "capitalize"}}
                />
              </div>
            </div>
        );
      case 3:
        return (
            <div>
              <h3>Describe workspace</h3>

              <label htmlFor="description">Enter workspace description</label>
              <textarea
                  className="description"
                  name="description"
                  rows="4"
                  placeholder="Type your content here..."
                  value={workspaceDescriptionState.value}
                  onChange={handleOnChange}
              />
              <small className="input_message">{!workspaceDescriptionState.isValid &&
                  "Workspace description is required and it must contain 5 character"}</small>
              <div className="step_btn">
                <CustomButton
                    text={{value: "prev"}}
                    handleClick={Previous}
                    variant={"primary"}
                    color={"rgba(55, 84, 219, 1)"}
                    size={"sm"}
                    sx={{marginTop: "2rem", textTransform: "capitalize"}}
                />
                <CustomButton
                    text={{value: "create workspace"}}
                    handleClick={createWorkspace}
                    variant={"primary"}
                    color={"rgba(55, 84, 219, 1)"}
                    size={"sm"}
                    sx={{marginTop: "2rem", textTransform: "capitalize"}}
                    disabled={loading || !formIsValid}
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
        <div className="img_container">
          <img src={RegisterBackgroundImage} alt=""/>
        </div>
        <div className="form_container">
          <form className="form_wrapper" noValidate>
            {getForm()}
          </form>
        </div>
      </div>
  );
};

export default CreateWorkspace;