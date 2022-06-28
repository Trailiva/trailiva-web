import React from 'react';
import Badge from "@mui/material/Badge";
import {Avatar} from "@mui/material";
import {styled} from "@mui/material/styles";

/**
 * Structure of how to use this component
 *             <ProfileImageThumbnail invisible={false} image={thumb} avatar={<Avatar alt="Remy Sharp" src={cancel} sx={{
 *                 width: 30,
 *                 height: 30,
 *                 position: 'absolute',
 *                 top: -78,
 *                 right: -10,
 *             }}/>}/>
 *             <ProfileImageThumbnail invisible={false} image={thumb} />
 * @type {{width: number, height: number}}
 */

const defaultAvatarStyle = {width: 80, height: 80};
const ProfileImageThumbnail = ({image, avatar, invisible, avatarStyle = defaultAvatarStyle}) => {

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            width: !avatar ? "15px" : "0",
            height: !avatar ? "15px" : "0",
            boxShadow: !avatar && `0 0 0 2px ${theme.palette.background.paper}`,
            position: avatar ? 'absolute' : "none",
            top: !avatar && -10,
            right: !avatar && 5,
            borderRadius: !avatar && '100%',
        }
    }));

    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            invisible={invisible}
            badgeContent={avatar ? avatar : null}
            variant={!avatar ? "dot" : null}
        >
            {image &&
                <Avatar alt="Travis Howard"
                        variant="rounded"
                        sx={avatarStyle}
                        src={image}
                />
            }
        </StyledBadge>
    );
};

export default ProfileImageThumbnail;