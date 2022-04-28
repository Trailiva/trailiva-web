import React from 'react';
import TaskBtn from "./TaskBtn";
import EmptyTaskIcon from "../../images/EmptyTask.svg";

const EmptyTask = ({handleClick}) => {

    return (
        <div className="empty_task">
            <img src={EmptyTaskIcon} alt="empty task icon"/>
            <div className="note">
                <h3>no task yet</h3>
                <p>You have no task created in your workspace yet. <br/>
                    Get productive. Create a Task Now.</p>
                <TaskBtn text="create task" handleOnClick={handleClick}/>
            </div>
        </div>
    );
};

export default EmptyTask;