import "../workspace/personal/personal.css";
import React, {useEffect, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomButton from "../../components/Buttons/CustomButton";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {createProjectHandler} from "../../store/project-action";
import {projectAction} from "../../store/project-slice";
import Navbar from "../../components/Navbar";

const isActionType = (action, actionType) => {
    return action.type === actionType;
}

const projectNameReducer = (state, action) => {
    if (isActionType(action, 'USER_INPUT')) {
        return {value: action.val, isValid: action.val.trim().length > 5};
    }
    return {value: '', isValid: false};
}
const projectDescriptionReducer = (state, action) => {
    if (isActionType(action, 'USER_INPUT')) {
        return {value: action.val, isValid: action.val.trim().length > 5};
    }
    return {value: '', isValid: false};
}

const CreateProject = () => {
    const [step, setStep] = useState(1);
    const [projectName, dispatchProjectName] = useReducer(projectNameReducer, {value: '', isValid: null});
    const [projectDescriptionState, dispatchProjectDescription] = useReducer(projectDescriptionReducer, {
        value: '',
        isValid: null
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const dispatchFn = useDispatch();
    const loading = useSelector((state) => state.project.isLoading);
    const errorMessage = useSelector((state) => state.project.errorMsg);
    const isSuccessful = useSelector((state => state.project.isSuccessful))
    const errorStatus = useSelector((state => state.project.errorStatus))
    const navigate = useNavigate();

    const {isValid: projectNameIsValid} = projectName;
    const {isValid: projectDescription} = projectDescriptionState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(projectNameIsValid && projectDescription);
        }, 500);

        return () => clearTimeout(identifier);
    }, [projectDescription, projectNameIsValid]);

    useEffect(() => {
        if (errorMessage) toast.error(errorMessage);
        if (isSuccessful) navigate("/")
        if (errorStatus === 401) navigate("/login")
        return () => setTimeout(() => dispatchFn(projectAction.setErrorMsg("")), 5000)
    }, [errorMessage, isSuccessful, dispatchFn]);

    const createWorkspace = async (e) => {
        e.preventDefault();
        const formData = {
            name: projectName.value,
            description: projectDescriptionState.value,
        }
        dispatchFn(createProjectHandler(formData))
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
            dispatchProjectName({type: 'USER_INPUT', val: value})
        } else if (name === "description") {
            dispatchProjectDescription({type: 'USER_INPUT', val: value})
        }
    };


    const getForm = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h3>create a <span>project</span></h3>
                        <label htmlFor="title">Enter the name of your project</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter the name of your project"
                            value={projectName.value}
                            onChange={handleOnChange}
                        />

                        <small className="input_message">{!projectName.isValid && "Project name is required and it must contain 5 character"}</small>
                        <CustomButton
                            text={{value: "next"}}
                            handleClick={Continue}
                            variant={"primary"}
                            color={"rgba(55, 84, 219, 1)"}
                            size={"sm"}
                            sx={{textTransform: "capitalize", display: "block", marginTop: "1rem", padding: "0.5rem 2rem"}}
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h3>Describe Project</h3>
                        <label htmlFor="description">Enter project description</label>
                        <textarea
                            className="description"
                            name="description"
                            rows="4"
                            placeholder="Type your content here..."
                            value={projectDescriptionState.value}
                            onChange={handleOnChange}
                        />
                        <small className="input_message">{!projectDescriptionState.isValid &&
                            "projectName description is required and it must contain 5 character"}</small>
                        <div className="step_btn">
                            <CustomButton
                                text={{value: "prev"}}
                                handleClick={Previous}
                                variant={"primary"}
                                color={"rgba(55, 84, 219, 1)"}
                                size={"sm"}
                                sx={{textTransform: "capitalize", display: "block", marginTop: "1rem", padding: "0.5rem 2rem"}}
                            />
                            <CustomButton
                                text={{value: "create project"}}
                                handleClick={createWorkspace}
                                variant={"primary"}
                                color={"rgba(55, 84, 219, 1)"}
                                size={"sm"}
                                sx={{textTransform: "capitalize", display: "block", marginTop: "1rem", padding: "0.5rem 2rem"}}
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
        <>
            <Navbar text="Login" none="none"/>
            <div className="container">
                <div className="form_container">
                    <form className="form_wrapper" noValidate>
                        {getForm()}
                    </form>
                </div>

            </div>
        </>
    );
};

export default CreateProject;