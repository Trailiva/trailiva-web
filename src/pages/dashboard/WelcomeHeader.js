import React from 'react';

const WelcomeHeader = ({firstName}) => {
    return (
        <>
            <h2>👋 <span className="greeting">Hi {firstName},</span>
                <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="welcome_text">Welcome to Semicolon Task Management</span>
            </h2>
        </>
    );
};

export default WelcomeHeader;