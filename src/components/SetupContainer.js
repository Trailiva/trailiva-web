import React from 'react';
import Setup from "./Setup";
import TaskWrapper from "../pages/tasks/TaskWrapper";

const SetupContainer = ({setups, handleSetup, firstName, handleAction}) => {
    return (
        <div className="setup">
            <h4>{(setups.length !== 0) ? "Let’s get you started" : "Tasks for Today."}</h4>
            {setups.map((setup, index) => {
                return (
                    <Setup
                        key={index}
                        id={index}
                        icon={setup.icon}
                        text={setup.content}
                        onChecked={handleSetup}
                        active={setup.active}
                        name={setup.name}
                        firstName={firstName}
                        handleSetup={handleSetup}
                        handleAction={handleAction}
                    />)
            })}
            {(setups.length === 0) && <TaskWrapper/>}
        </div>
    );
};

export default SetupContainer;