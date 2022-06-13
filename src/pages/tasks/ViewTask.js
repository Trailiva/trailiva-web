import React from 'react';
import Typography from "@mui/material/Typography";
import {Button, Card, CardActions, CardContent, Step, StepButton, StepLabel, Stepper} from "@mui/material";
import editIcon from "../../images/editIcon.svg";
import deleteIcon from "../../images/deleteIcon.svg";
import Box from "@mui/material/Box";

const ViewTask = (props) => {
    const steps = [
        'Select master blaster campaign settings',
        'Create an ad group',
        'Create an ad',
    ];
    return (

        <Card elevation={0} sx={{
            borderRadius: '16px',
            padding: '1rem',
        }}>

            {/*<Stepper orientation="vertical" activeStep={2}>*/}
            {/*    <Step>*/}
            {/*        <StepLabel>Register your name</StepLabel>*/}
            {/*    </Step>*/}
            {/*    <Step>*/}
            {/*        <StepLabel>Register your email</StepLabel>*/}
            {/*    </Step>*/}
            {/*    <Step>*/}
            {/*        <StepLabel>Click on Finish</StepLabel>*/}
            {/*    </Step>*/}
            {/*</Stepper>*/}

            <CardContent >
                <Typography variant="h5" component="h5"  mb={1} sx={{
                    fontWeight: "bold"
                }}>
                    Work on a personal landing page project.
                </Typography>
                <div className="task_item">
                    <small className="pending">Pending</small>
                </div>
                <Typography variant="body2" component="p" my={2} sx={{
                    width: 522,
                    lineHeight: "1.3rem",
                    fontWeight: "200",
                    color: "#808080",
                }}>
                    I am to create a simpe design system to use to teach aspiring UI / UX Designers in my
                    forth-coming cass on the 2nd of october 20201
                </Typography>
            </CardContent>
            <CardActions >
                <Button variant="contained" disableElevation sx={{
                    backgroundColor: "#3754DB",
                    color: "#FFF",
                    textTransform: "capitalize",
                    marginRight: "1rem",
                    padding: "0.5rem 1.5rem",
                    borderRadius: "12px",

                }}>work on it now</Button>
                <img  style={{ margin: "0 1rem", background: "#FFF0F0", padding: "0.7rem", borderRadius: "10px", cursor: "pointer"}} src={deleteIcon} alt="delete icon"/>
                <img style={{ background: "#F6F8FD", padding: "0.7rem", borderRadius: "10px", cursor: "pointer"}} src={editIcon} alt="edit icon"/>
            </CardActions>
        </Card>
    );
};

export default ViewTask;