import React from 'react';
import ClickedArrow from "../../images/ClickedArrow.svg";
import "./task.css";

const TaskCard = ({name, taskTab, referencedName, viewTask}) => {
    return (
        <div className="task_card">
            <div className="task_item">
                <p>{referencedName ? referencedName : "pending"}</p>
                <small className={taskTab}>{taskTab}</small>
            </div>
            <h6 className="task_name">{name}</h6>
            <button className="view_task_btn" onClick={viewTask}>
                view task
                <img src={ClickedArrow} alt="view task icon"/>
            </button>
        </div>
    );
};

export default TaskCard;