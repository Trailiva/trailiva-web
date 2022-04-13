import React from 'react';
import ClickedArrow from "../../images/ClickedArrow.svg";
import "./task.css";

const TaskCard = ({name, taskTab, referencedName}) => {
    return (
        <div className="task_card">
            <div className="task_item">
                <p>{referencedName}</p>
                <small>{taskTab}</small>
            </div>
            <h6 className="task_name">{name}</h6>
            <button className="view_task_btn">
                view task
                <img src={ClickedArrow} alt="view task icon"/>
            </button>
        </div>
    );
};

export default TaskCard;