import "./personal.css";
import React, {useState} from "react";
import Office from "../../../images/office.svg";
import Profile from "../../../images/profile.svg";
import Checked from "../../../images/check.svg";
import CheckedProfile from "../../../images/checkedProfile.svg";
import CheckedOffice from "../../../images/checkOffice.svg";
import {useNavigate} from "react-router-dom";
import RegisterBackgroundImage from "../../../images/RegisterBackground.png";
import {handleWorkspaceCreation} from "../../../api/ApiUtils";
import {HAS_WORKSPACE} from "../../../constants";


const CreateWorkspace = () => {
    const [checked, setChecked] = useState(false);
    const [selected, setSelected] = useState(false);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const INITIAL_DATA = {name: "", workSpaceType: "", description: ""}
    const [formData, setFormData] = useState(INITIAL_DATA);

    const createWorkspace = async (e) => {
        e.preventDefault();
        try{
            const res = await  handleWorkspaceCreation(formData);
            setFormData(INITIAL_DATA)
            console.log(res.data);
            localStorage.setItem(HAS_WORKSPACE, true);
            localStorage.setItem("WORKSPACE_ID", res.data.workspaceId);
            navigate("/")
        }catch (err) {
            console.log('err', err);
        }
    }

    const prevStep = () => setStep(step - 1);
    const nextStep = () => setStep(step + 1);


    const Continue = e => {
        e.preventDefault();
        nextStep();
    }

    const Previous = e => {
        e.preventDefault();
        prevStep();
    }


    const handleOnChange = e => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }


    const getForm = () => {
        const selectedStyle = {
            border: "3px solid #6684FF",
        }
        const checkedStyle = {
            position: "absolute",
            left: "120px",
            top: "15px"
        }


        const selectedButton = e => {
            e.preventDefault();
            setSelected(!selected);
            setChecked(false);
            setFormData({...formData, workSpaceType: "OFFICIAL"})
        }

        const checkedButton = e => {
            e.preventDefault();
            setChecked(!checked);
            setSelected(false);
            setFormData({...formData, workSpaceType: "PERSONAL"})
        }


        switch (step) {
            case 1:
                return (
                    <div>
                        <h3>create a <span>workspace</span></h3>
                        <label htmlFor="title">Title your workspace</label>
                        <input type="text" name="name"
                               placeholder="Trailiva Project" value={formData.name} onChange={handleOnChange}/>

                        {/*<small className="input_message">{errors.title && errors.title.message}</small>*/}
                        <button className="next_btn" onClick={Continue}>Next</button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <h3>Why do you need the <span>workspace</span></h3>
                        <div className="workspace_type">
                            <button onClick={checkedButton}
                                    style={checked ? selectedStyle : null}>
                                {checked && <img src={Checked} alt="checked icon" style={checkedStyle}/>}
                                <img src={checked ? CheckedProfile : Profile} alt="personal icon"/>
                                <p style={checked ? {color: "#3754DB"} : null}>personal use</p>
                                <small>some description of the purpose"</small>
                            </button>

                            <button onClick={selectedButton}
                                    style={selected ? selectedStyle : null}
                            >
                                {selected && <img src={Checked} alt="checked icon" style={checkedStyle}/>}
                                <img src={selected ? CheckedOffice : Office} alt="official icon"/>
                                <p style={selected ? {color: "#3754DB"} : null}>official use</p>
                                <small>some description of the purpose"</small>
                            </button>
                        </div>
                        <div className="step_btn">
                            <button className="next_btn" onClick={Previous}>Prev</button>
                            <button className="next_btn" onClick={Continue}>Next</button>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <h3>Describe workspace</h3>
                        <label htmlFor="description">Enter workspace description</label>
                        <textarea className="description" name="description" rows="4"
                                  placeholder="Type your content here..."
                                  value={formData.description}
                                  onChange={handleOnChange}
                        />
                        {/*<small className="input_message">{errors.description && errors.description.message}</small>*/}
                        <div className="step_btn">
                            <button className="next_btn" onClick={Previous}>Prev</button>
                            <button className="next_btn" type="submit">create workspace</button>
                        </div>
                    </div>
                )
            default:
                return (
                    <div>Hello world</div>
                )
        }
    }

    return (<div className="container">
        <div className="img_container">
            <img src={RegisterBackgroundImage} alt=""/>
        </div>
        <div className="form_container">
            <form className="form_wrapper"
                  noValidate
                  onSubmit={createWorkspace}>
                {getForm()}
            </form>
        </div>
    </div>)
};

export default CreateWorkspace;