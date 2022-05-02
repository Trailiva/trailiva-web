import React from 'react';

const TaskHeader = ({handleCreateTask}) => {

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
           <div><h3 style={{
               fontSize: "1.5rem",
               color: "#101C56"
           }}> Tasks</h3>
               <p style={{
                   color: "#636363",
                   fontSize: "0.9rem"
               }}>Your tasks in your space.</p></div>
            <button className='task_btn' onClick={handleCreateTask}>create task</button>
        </div>
    );
};

export default TaskHeader;