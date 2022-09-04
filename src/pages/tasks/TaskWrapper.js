import React from 'react';
import {dummyTask} from "../../data/taskData";
import TaskCard from "./TaskCard";

const TaskWrapper = () => {
    return (
        <div className="task_wrapper">
            {
                dummyTask.map(task => {
                    return <TaskCard
                        taskTab={task.taskTab}
                        name={task.name}
                        key={task.id}
                        referencedName={task.referenceName}
                    />
                })
            }
        </div>
    );
};

export default TaskWrapper;