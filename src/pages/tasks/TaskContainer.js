import React from 'react';
import EmptyTask from "./EmptyTask";

const TaskContainer = ({onHandleClick}) => {
    return (
        <>
            <EmptyTask handleClick={onHandleClick}/>
        </>
    );
};

export default TaskContainer;