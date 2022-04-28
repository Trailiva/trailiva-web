import React from 'react';
import Account from './Account'
import Nav from "./Nav";
import {Grid} from "@mui/material";

const Sidebar = ({name, handleActiveSidebar}) => {
    return (<div>
        <Grid container spacing={0}>
            <Grid item md={3.5}>
                <Account/>
            </Grid>
            <Grid item md={8.5}>
                <Nav name={name} onHandleLink={handleActiveSidebar}/>
            </Grid>
        </Grid>

    </div>);
};

export default Sidebar;
