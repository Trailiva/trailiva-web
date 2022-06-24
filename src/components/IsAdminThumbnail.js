import React from 'react';
import Badge from "@mui/material/Badge";
import {Avatar} from "@mui/material";
import {styled} from "@mui/material/styles";

const SmallAvatar = styled(Avatar)(() => ({
    width: 20,
    height: 20,
    position: 'absolute',
    top: -33,
    right: -4,
}));


const IsAdminThumbnail = ({icon, image, onClick}) => {
    return (
        <Badge
            onClick={onClick}
            sx={{cursor: "pointer"}}
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            badgeContent={
                <SmallAvatar alt="Remy Sharp" src={icon} />
            }
        >
            <Avatar alt="Travis Howard"
                    variant="rounded"
                    src={image}/>
        </Badge>
    );
};

export default IsAdminThumbnail;