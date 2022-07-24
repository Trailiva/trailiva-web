import React from 'react';
import ClickedArrow from "../../images/ClickedArrow.svg";
import "./task.css";
import Badge from "../../components/Badge/Badge";

const TaskCard = ({name, taskTab, referencedName, viewTask, id}) => {

    const taskHandler = (e) => {
        const id = e.currentTarget.id;
        console.log(id);
        viewTask(id);
    }
    return (
        <div className="task_card" id={id} onClick={taskHandler}>
            <div className="task_item">
                <p>{referencedName ? referencedName : ""}</p>
                <Badge badgeContent={taskTab}/>
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