import {CircularProgress, Grid, Snackbar} from "@mui/material";
import "./dashboard.css"
import Notifications from "../../images/notification.svg"
import {SearchOutlined} from "@material-ui/icons";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Alert, CalendarPicker} from "@mui/lab";
import {SETUP_DATA} from "../../data/dashbaordData";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ProfileUpload from "./ProfileUpload";
import {getRandomQuote, handleImageUpload, handleImageUploadToCloudinary} from "../../api/ApiUtils";
import SidebarHeader from "../../components/SidebarHeader";
import WelcomeHeader from "./WelcomeHeader";
import SetupContainer from "../../components/SetupContainer";
import TaskHeader from "../tasks/TaskHeader";
import DailyQuote from "./DailyQuote";
import TaskContainer from "../tasks/TaskContainer";
import TaskCreator from "../../components/TaskCreator";
import {useEffect, useState} from "react";
import Sidebar from "../../components/Sidebar";
import {useProfileQuery} from "../../services/dashboardService.js";


const Dashboard = () => {
    const INITIAL_IMAGE_DATA = {url: "", public_id: "", blob: "", file: ""}

    const [date, setDate] = useState(new Date());
    const [setups, setSetups] = useState(SETUP_DATA)
    const [userData, setUserData] = useState({loading: true});
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState(INITIAL_IMAGE_DATA);
    const [isUploaded, setIsUploaded] = useState(false);
    const [sidebar, setSidebar] = useState({overview: true, tasks: false, settings: false});
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
    const [taskCreated, setTaskCreated] = useState(false);
    const [workspaceData, setWorkspaceData] = useState({});
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleClickOpen = () => setOpen(true);
    const handleOpenCreateTaskModal = () => setOpenCreateTaskModal(true);
    const handleCloseCreateTaskModal = () => setOpenCreateTaskModal(false);


    const handleClose = () => {
        URL.revokeObjectURL(imageData.blob);
        setIsUploaded(false);
        setImageData(INITIAL_IMAGE_DATA);
        setOpen(false);
    };


    const setProfilePictureThumb = (user) => {
        if (user.imageUrl)
            return (<div className="fill">
                <img src={user.imageUrl} alt="user icon"/>
                <div className="middle" onClick={handleClickOpen}>
                    <div className="text">Upload image<FileUploadIcon/></div>
                </div>
            </div>)
        else {
            const userThumb = (user.firstName.charAt(0) + " " + user.lastName.charAt(0)).toUpperCase();
            return (
                <div className="fill">
                    <h2 className="user_profile">{userThumb}</h2>
                    <div className="middle" onClick={handleClickOpen}>
                        <div className="text">Upload image<FileUploadIcon/></div>
                    </div>
                </div>
            )
        }
    }

    const handleUploadProfileImage = (file) => {
        setImageData(prevState => {
            return {...prevState, blob: URL.createObjectURL(file), file}
        })
    }

    const handleCreateTask = () => {
        handleOpenCreateTaskModal();
    }


    const upload = async () => {
        try {
            const response = await handleImageUploadToCloudinary(imageData.file);
            console.log(response.data);
            setImageData(prevState => {
                return {...prevState, url: response.data.url, public_id: response.data.public_id}
            });
            setIsUploaded(true);
            await handleImageUpload({url: response.data.url, public_id: response.data.public_id});
        } catch (e) {
            console.log("e", e)
        }
    }

    const handleAction = (actionType) => {
        switch (actionType) {
            case "profile":
                handleClickOpen();
                break;
            case "task":
                handleCreateTask();
                break;
            default:
        }
    }

    const handleSidebarLinkSwitch = (actionType) => {
        switch (actionType) {
            case "tasks":
                setSidebar({overview: false, settings: false, tasks: true})
                break
            case "settings":
                setSidebar({overview: false, settings: true, tasks: false})
                break
            case "overview":
                setSidebar({overview: true, settings: false, tasks: false})
                break
            default:
        }
    }

    const removeAction = (actionType) => {
        const updatedSetup = setups.filter(setup => setup.name !== actionType);
        if (updatedSetup.length > 0) updatedSetup[0].active = true;
        setSetups(updatedSetup);
    }

    const handleSetup = (name) => {
        let currentSetup = setups.find(setup => setup.name === name);
        currentSetup.active = true;

        let updatedSetups = setups.map(setup => {
            if (setup.name !== name) setup.active = false;
            return {...setup, currentSetup}
        })
        setSetups(updatedSetups);
        console.log(updatedSetups)
    }

    const handleValidateTaskCreated = (isSuccessful) => {
        if (isSuccessful) {
            setTaskCreated(isSuccessful);
        }
    }

    const {
        data: profileData,
        isLoading: loadingProfile,
        isError: isProfileError,
        error: profileError} = useProfileQuery();

    if (isProfileError){
        console.log(profileError);
    }

    // setProfilePictureThumb(profileData);


    // console.log(profileData)
    //
    // const {
    //     data,
    //     isLoading: loadingWorkSpace,
    //     isError,
    //     error,
    //     isSuccess
    // } = useWorkspaceQuery();
    //
    // console.log(data)

const generateRandomQuote = async ()=> {
    try {
        const response = await getRandomQuote();
        console.log(response.data);
        const {author, content} = response.data;
        setQuote(content);
        setAuthor(author);
    } catch (err) {
        console.log(err)
    }
}
    useEffect(() => {
        generateRandomQuote()
    }, [])


    return (
        loadingProfile ? <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh"
            }}>
                <CircularProgress/>
            </div>
            :
            <>
                <ProfileUpload
                    open={open}
                    handleClose={handleClose}
                    handleProfileUpload={handleUploadProfileImage}
                    uploadedImage={imageData.blob}
                    upload={upload}
                    isUploaded={isUploaded}
                    handleIsUploaded={setIsUploaded}
                />
                {isUploaded && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width: '100%', fontWeight: "bold"}}>
                        Profile Upload successful
                    </Alert>
                </Snackbar>}
                <Grid container spacing={0}>
                    <Grid item xs={2}>
                        <Sidebar workspaceName={workspaceData.name} name={profileData?.firstName}
                                 handleActiveSidebar={handleSidebarLinkSwitch}/>
                    </Grid>
                    <TaskCreator isSuccessful={taskCreated} validateTaskCreated={handleValidateTaskCreated}
                                 open={openCreateTaskModal} handleClosePopup={handleCloseCreateTaskModal}/>
                    <Grid container={true} item xs={10} bgcolor="#F6F8FD" justifyContent="end" p={2}>
                        <Grid item xs={8.5}>
                            <div className="search">
                                <div className="search_container">
                                    <input type="text" name="search" placeholder="Search your Space here..."/>
                                    <SearchOutlined/>
                                </div>
                                <img src={Notifications} alt="Notification icon"/>
                            </div>

                            <div className="welcome_container">
                                <SidebarHeader>
                                    {sidebar.overview && <WelcomeHeader firstName={profileData?.firstName}/>}
                                    {sidebar.tasks && <TaskHeader handleCreateTask={handleOpenCreateTaskModal}/>}
                                </SidebarHeader>

                                {sidebar.tasks &&
                                    <TaskContainer isSuccessful={taskCreated}
                                                   onHandleClick={handleOpenCreateTaskModal}/>}

                                {sidebar.overview && <DailyQuote quote={quote} author={author}/>}
                                {sidebar.overview && <SetupContainer
                                    setups={setups}
                                    firstName={profileData?.firstName}
                                    handleAction={handleAction}
                                    handleSetup={handleSetup}
                                />
                                }

                            </div>
                        </Grid>
                        <Grid item xs={3.5} bgcolor="#FFF" borderRadius={5}>
                            <div className="user_thumb">
                                {setProfilePictureThumb(profileData)}
                                <h4 className="name">{profileData?.firstName + " " + profileData?.lastName}</h4>
                                <p className="email">{profileData?.email}</p>
                                <button>my profile</button>
                            </div>

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <div className="calendar">
                                    <Grid item xs={12} md={6} mt={5}>
                                        <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)}/>
                                    </Grid>
                                </div>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </>

    );
};

export default Dashboard;