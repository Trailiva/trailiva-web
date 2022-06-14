import React, {useEffect, useState} from 'react';
import EmptyTask from "./EmptyTask";
import {handleFetchWorkspaceTasks} from "../../api/ApiUtils";
import {styled} from '@mui/material/styles';
import Box from "@mui/material/Box";
import {Chip, Grid, Tab, Tabs} from "@mui/material";
import TaskCard from "./TaskCard";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";


const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan"/>}}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 80,
        width: '100%',
        backgroundColor: '#3754DB',
    },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({theme}) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        color: '808080',
        '&.Mui-selected': {
            color: '#3754DB',
            fontWeight: theme.typography.fontWeightBold,
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#3754DB',
        },
    }),
);


const TaskContainer = ({onHandleClick, isSuccessful, handleViewTask}) => {
    const [tasks, setTask] = useState([]);
    const [value, setValue] = useState(0);
    const [badgeStyle, setBadgeStyle] = useState({color: "#3754DB", backgroundColor: "#F0F0F0"})


    const handleChange = (event, newValue) => {
        setValue(newValue);
        setBadgeStyle({color: "#3754DB", backgroundColor: "#F2F4FD"})
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

const formatTaskTab = (tab) => {
    let formattedTab = tab;
    if (tab === "IN_PROGRESS") {
        formattedTab = tab.replace("_", " ");
    }
    return formattedTab.toLowerCase();
}

const displayTask = (tasks, onViewTask) => {
    return (
        <Box sx={{flexGrow: 0}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {tasks.map((task, index) => (
                 <Grid item xs={2} sm={4} md={4} key={index} sx={{paddingLeft: "0 !important"}}>
                        <TaskCard id={task.id} name={task.name} referencedName="TR-01" taskTab={formatTaskTab(task.tab)}
                                  viewTask={onViewTask}/>
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


const tabs = [
    {
        name: "All",
        getTasks: tasks
    },
    {
        name: "Pending",
        getTasks: getPendingTask(),
    },
    {
        name: "In progress",
        getTasks: getInProgressTask()
    },
    {
        name: "Completed",
        getTasks: getCompletedTask(),
    }
];

return (
    <>
        {tasks.length < 1 ? <EmptyTask handleClick={onHandleClick}/> :
            <>
                <AppBar position="static" color="default" elevation={0} sx={{mt: 4}}
                        style={{backgroundColor: 'transparent'}}>
                    <StyledTabs
                        value={value}
                        onChange={handleChange}
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {tabs.map((tab, index) => {
                            return (
                                <StyledTab key={index} disableRipple
                                           icon={<Chip label={tab.getTasks.length} size="small"
                                                       style={badgeStyle}/>} iconPosition="end"
                                           label={tab.name} {...a11yProps(index)}
                                           style={{textTransform: "capitalize", letterSpacing: "0.05em"}}/>
                            )
                        })}

                    </StyledTabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    {displayTask(tasks, handleViewTask)}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {displayTask(getPendingTask(), handleViewTask)}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {displayTask(getInProgressTask(), handleViewTask)}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {displayTask(getCompletedTask(), handleViewTask)}
                </TabPanel>
            </>
        }
    </>
);
}
;

export default TaskContainer;