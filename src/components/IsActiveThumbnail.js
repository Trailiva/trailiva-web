import React from 'react';
import {Avatar} from "@mui/material";
import {styled} from "@mui/material/styles";
import Badge from '@mui/material/Badge';


const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        width: "15px",
        height: "15px",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        position: 'absolute',
        top: 6,
        right: 4,
        borderRadius: '100%',
    },
}));


const defaultAvatarStyle = {width: 80, height: 80};

const IsActiveThumbnail = ({image, avatarStyle = defaultAvatarStyle}) => {
    return (
        <>
            <StyledBadge
                sx={{cursor: "pointer"}}
                overlap="circular"
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                variant="dot"
            >
                <Avatar alt="Remy Sharp"
                        src={image}
                        variant="rounded"
                        sx={avatarStyle}
                />
            </StyledBadge>


        </>
    );
};

export default IsActiveThumbnail;