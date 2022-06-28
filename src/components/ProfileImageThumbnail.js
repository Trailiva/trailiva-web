import React, {useState} from 'react';
import Badge from "@mui/material/Badge";
import {Avatar} from "@mui/material";
import {styled} from "@mui/material/styles";
import UploadIcon from "../images/upload.svg";

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
 *
 *               <ProfileImageThumbnail show={show} handleShow={handleShow} handleClose={handleClose} invisible={false} image={thumb} avatar={<Avatar alt="Remy Sharp" src={cancel} sx={{
 *                 width: 30,
 *                 height: 30,
 *                 position: 'absolute',
 *                 top: -78,
 *                 right: -10,
 *             }}/>}/>
 * @type {{width: number, height: number}}
 */

const defaultAvatarStyle = {width: 80, height: 80, position: "relative", cursor: "pointer"};
const ProfileImageThumbnail = ({image, avatar, invisible, avatarStyle = defaultAvatarStyle, show , handleShow, handleClose}) => {

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
    if (show) {
        invisible = true;
    }
    return (
        <StyledBadge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            invisible={invisible}
            badgeContent={avatar ? avatar : null}
            variant={!avatar ? "dot" : null}
        >
            {show && <Avatar src={UploadIcon}
                             onMouseOver={handleShow}
                             sx={{position: "absolute", top: "20%", left: "25%", zIndex: "100", cursor: "pointer"}}/>}
            {image &&
                <Avatar alt="Travis Howard"
                        variant="rounded"
                        sx={avatarStyle}
                        src={image}
                        onMouseOver={handleShow}
                        onMouseOut={handleClose}
                />
            }
        </StyledBadge>
    );
};

export default ProfileImageThumbnail;