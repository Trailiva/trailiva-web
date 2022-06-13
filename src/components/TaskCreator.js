import React, {useState} from 'react';
import CustomTextArea from "./CustomTextArea";
import CancelIcon from "@mui/icons-material/Cancel";
import {Snackbar} from "@mui/material";
import {Alert} from "@mui/lab";
import {handleCreateTask} from "../api/ApiUtils";
import {HAS_CREATED_TASK} from "../constants";

const TaskCreator = ({handleClosePopup, open, validateTaskCreated, isSuccessful}) => {
    const INITIAL_DATA = {name: "", priority: "", description: "", dueDate: ""}
    const [formData, setFormData] = useState(INITIAL_DATA);
    const options = ["LOW", "MEDIUM", "HIGH"];
    const [loading, setLoading] = useState(false);

    const createTask = async e => {
        e.preventDefault()
        //Todo: validate user input
        setLoading(true);
        try {
            const res = await handleCreateTask(formData)
            console.log(res.data)
            validateTaskCreated(true);
            localStorage.setItem(HAS_CREATED_TASK, true);
        } catch (e) {
            console.log("err", e)
        }
        setLoading(false);
        setFormData(INITIAL_DATA);
        console.log(formData)
    }

    const handleOnChange = e => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleClose = () => {
        setLoading(false);
        setFormData(INITIAL_DATA);
        handleClosePopup();
    }

    return (
        <>
            <div className="backdrop" onClick={handleClose} style={{display: open ? "block" : "none"}}/>
            {isSuccessful && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%', fontWeight: "bold"}}>
                    Task created successful
                </Alert>
            </Snackbar>}
            {open &&
                <div className="task_creator popup">
                    <CancelIcon sx={{
                        position: "absolute",
                        right: "4%",
                        top: "3%",
                        cursor: "pointer"
                    }}
                                onClick={handleClose}
                    />
                    <h3>create task</h3>
                    <form onSubmit={createTask}>
                        <div className="form-input">
                            <label htmlFor="task_name">task name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleOnChange}/>
                        </div>

                        <div className="form_select">
                            <div className="form-input">
                                <label htmlFor="task_name">task priority</label>
                                <select name="priority"
                                        onChange={handleOnChange}
                                        value={formData.priority}
                                >
                                    <option defaultValue="Select task priority">Select Task priority</option>
                                    {options.map((option, index) => {
                                        return <option value={option} key={index}>{option}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-input">
                                <label htmlFor="task_date">due date</label>
                                <input type="date" name="dueDate" value={formData.dueDate}
                                       onChange={handleOnChange}/>
                            </div>
                        </div>

                        <CustomTextArea
                            description={formData.description}
                            label="Enter task description"
                            placeholder="Type your content here..."
                            handleOnChange={handleOnChange}
                            row={3}
                            name="description"
                        />
                        <button type="submit" className="task_btn"> {loading && (
                            <i className="fa fa-refresh fa-spin" style={{marginRight: "5px"}}/>
                        )}create task
                        </button>
                    </form>
                </div>
            }
        </>
    );
};

export default TaskCreator;