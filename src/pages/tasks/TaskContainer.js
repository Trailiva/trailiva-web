import React, {useEffect, useState} from 'react';
import EmptyTask from "./EmptyTask";
import {handleFetchWorkspaceTasks} from "../../api/ApiUtils";
import Box from "@mui/material/Box";
import {Grid, Tab, Tabs} from "@mui/material";
import TaskCard from "./TaskCard";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import {createSelector} from "reselect";


const TaskContainer = ({onHandleClick, isSuccessful}) => {
    const [tasks, setTask] = useState([]);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const getTask = async () => {
        try {
            const res = await handleFetchWorkspaceTasks();
            setTask(res.data);
        } catch (err) {
            console.log("err", err)
        }
    }


    useEffect(() => {
        getTask();
    }, [isSuccessful])


    const TabPanel = (props) => {
        const {children, value, index, ...other} = props;
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        );
    }
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    };

    const formatTaskTab = (tab) =>{
        let formattedTab = tab;
        if (tab === "IN_PROGRESS"){
            formattedTab = tab.replace("_", " ");
        }
        return formattedTab.toLowerCase();
    }

    const displayTask = tasks => {
        return (
            <Box sx={{flexGrow: 0}}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} rowSpacing={1}>                    {tasks.map((task, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index} >
                            <TaskCard name={task.name} referencedName="TR-01" taskTab={formatTaskTab(task.tab)}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    }

    const a11yProps = (index) => {
        return {
            id: `scrollable-auto-tab-${index}`,
            "aria-controls": `scrollable-auto-tabpanel-${index}`
        };
    }

    const getPendingTask = () => tasks.filter(task => task.tab === "PENDING")
    const getInProgressTask = () => tasks.filter(task => task.tab === "IN_PROGRESS")
    const getCompletedTask = () => tasks.filter(task => task.tab === "COMPLETED")


    return (
        <>
            {tasks.length < 1 ? <EmptyTask handleClick={onHandleClick}/> :
                <>
                    <AppBar position="static" color="default" elevation={0} sx={{mt: 4}}
                            style={{backgroundColor: 'transparent'}}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                        >
                            <Tab disableRipple label="All" {...a11yProps(0)}
                                 style={{textTransform: "capitalize", letterSpacing: "0.05em", fontWeight: 400}}/>
                            <Tab disableRipple label="Pending" {...a11yProps(1)}
                                 style={{textTransform: "capitalize", letterSpacing: "0.05em", fontWeight: 400}}/>
                            <Tab disableRipple label="In Progress" {...a11yProps(2)}
                                 style={{textTransform: "capitalize", letterSpacing: "0.05em", fontWeight: 400}}/>
                            <Tab disableRipple label="Completed" {...a11yProps(3)}
                                 style={{textTransform: "capitalize", letterSpacing: "0.05em", fontWeight: 400}}/>
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        {displayTask(tasks)}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {displayTask(getPendingTask())}
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        {displayTask(getInProgressTask())}
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        {displayTask(getCompletedTask())}
                    </TabPanel>
                </>
            }
        </>
    );
};

export default TaskContainer;