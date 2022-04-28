import React from 'react';

const TaskHeader = () => {


    return (
        <>
           <h3 style={{
               fontSize: "1.5rem",
               color: "#101C56"
           }}> Tasks</h3>
            <p style={{
                color: "#636363",
                fontSize: "0.9rem"
            }}>Your tasks in your space.</p>
        </>
    );
};

export default TaskHeader;