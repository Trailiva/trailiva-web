import React from 'react';

const Badge = ({badgeContent}) => {
    return (<small className={badgeContent}>{badgeContent}</small>);
};

export default Badge;