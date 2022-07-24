import React, {useState} from 'react';
import CustomTextArea from "./CustomTextArea";
import CancelIcon from "@mui/icons-material/Cancel";
import {HAS_CREATED_TASK} from "../constants";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {extractErrorMessage} from "../utils/helper";
import {handleCreateTask} from "../services/taskService";


const TaskCreator = ({handleClosePopup, open, validateTaskCreated}) => {
    const INITIAL_DATA = {name: "", priority: "", description: "", dueDate: ""}
    const [task, setTask] = useState(INITIAL_DATA);
    const options = ["LOW", "MEDIUM", "HIGH"];
    const [loading, setLoading] = useState(false);

    const createTask = async e => {
        e.preventDefault()
       {
            setLoading(true);
            try {
                await handleCreateTask(task)
                setLoading(false);
                localStorage.setItem(HAS_CREATED_TASK, true);
                validateTaskCreated(true)
                setTask(INITIAL_DATA);
                toast.success("Task created successful");
                setLoading(false);
            } catch (e) {
                toast.error(extractErrorMessage(e));
                setLoading(false);
            }
        }
    }

    // function validateTaskDueDate(dueDate, today) {
    //     return dueDate.getFullYear() >= today.getFullYear() &&
    //         dueDate.getMonth() + 1 >= today.getMonth() + 1 &&
    //         dueDate.getDate() >= today.getDate();
    // }

    // const validateTask = task => {
    //     let today = new Date();
    //     let dueDate = new Date(task.dueDate);
    //     if (!task.name.trim().length > 0) {
    //         toast.error("Task name is required")
    //         return false;
    //     }
    //     if (!validateTaskDueDate(dueDate, today)) {
    //         toast.error("Due date must be at least today")
    //         return false;
    //     }
    //     return true;
    // }

    const handleOnChange = e => {
        const {name, value} = e.target;
        setTask({...task, [name]: value})
    }

    const handleClose = () => {
        setLoading(false);
        setTask(INITIAL_DATA);
        handleClosePopup();
    }

    return (
        <>
            <div className="backdrop" onClick={handleClose} style={{display: open ? "block" : "none"}}/>
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
                            <input type="text" name="name" value={task.name} onChange={handleOnChange}/>
                        </div>

                        <div className="form_select">
                            <div className="form-input">
                                <label htmlFor="task_name">task priority</label>
                                <select name="priority"
                                        onChange={handleOnChange}
                                        value={task.priority}
                                >
                                    <option defaultValue="Select task priority">Select Task priority</option>
                                    {options.map((option, index) => {
                                        return <option value={option} key={index}>{option}</option>
                                    })}
                                </select>
                            </div>
                            <div className="form-input">
                                <label htmlFor="task_date">due date</label>
                                <input type="date" name="dueDate" value={task.dueDate}
                                       onChange={handleOnChange}/>
                            </div>
                        </div>

                        <CustomTextArea
                            description={task.description}
                            label="Enter task description"
                            placeholder="Type your content here..."
                            handleOnChange={handleOnChange}
                            row={3}
                            name="description"
                        />
                        <button type="submit" className="task_btn" disabled={loading}> {loading && (
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