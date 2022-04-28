import React from 'react';

const TaskBtn = ({handleOnClick, text, type}) => {
    return (
     <div className="task_btn_container">
         <button onClick={handleOnClick} type={type} className="task_btn">{text}</button>
     </div>
    );
};

export default TaskBtn;