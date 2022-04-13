import React, {useEffect, useState} from 'react';
import Sidebar from "../../components/Sidebar";
import {Grid, Snackbar} from "@mui/material";
import "./dashboard.css"
import Notifications from "../../images/notification.svg"
import {Close, SearchOutlined} from "@material-ui/icons";
import QuoteBg from "../../images/quoteBg.png"
import {api} from "../../api/api";
import Setup from "../../components/Setup"
import UserThumb from "../../images/user_thumb.svg";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Alert, CalendarPicker} from "@mui/lab";
import {SETUP_DATA} from "../../data/dashbaord";
import axios from "axios";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ProfileUpload from "./ProfileUpload";
import {deleteImageUploadToCloudinary, handleImageUpload, handleImageUploadToCloudinary} from "../../api/ApiUtils";
import {AUTH_HEADER} from "../../constants";
import TaskWrapper from "../tasks/TaskWrapper";


const Dashboard = () => {
    const [date, setDate] = React.useState(new Date());
    const [quote, setQuote] = useState("When you dance, your purpose is not to get to a certain place on the floor. It's to enjoy each step along the way.");
    const [author, setAuthor] = useState("Dontey Wilder");
    const [setups, setSetups] = useState(SETUP_DATA)
    const [userData, setUserData] = useState("");
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState({url: "", public_id: ""});
    const [isUploaded, setIsUploaded] = useState(false);
    const [error, setErros] = useState({});


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setImageData({url: "", public_id: ""});
        setOpen(false);
    };


    const setProfilePictureThumb = (user) => {
        if (!user)
            return <img src={UserThumb} alt="user icon"/>
        else if (user.profileImage)
            return (<div className="fill">
                <img src={userData.profileImage} alt="user icon"/>
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

    function deleteUploadedPicture(public_id) {
        deleteImageUploadToCloudinary(public_id).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log("err", err)
        })
    }


    const handleUploadProfileImage = (file) => {
        handleImageUploadToCloudinary(file).then(res => {
            setImageData({url: res.data.url, public_id: res.data.public_id});

        }).catch(err => {
            console.log("err", err);
        })
    }


    const upload = () => {
        handleImageUpload(imageData).then(res => {
            setIsUploaded(res.data.successful);
            setups.shift();
        }).catch(err => {
            setIsUploaded(true)
            console.log("err", err);
        })
    }


    useEffect(() => {
        const getRandomQuote = api.get("https://api.quotable.io/random");
        const getUserProfile = api.get("users/profile", {
            headers: AUTH_HEADER
        });

        axios.all([getRandomQuote, getUserProfile]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]

            setUserData({
                email: responseTwo.data.email,
                firstName: responseTwo.data.firstName,
                lastName: responseTwo.data.lastName,
                profileImage: responseTwo.data.imageUrl
            })

            // console.log(responseTwo.data)
            console.log(userData)

            setAuthor(responseOne.data.author);
            setQuote(responseOne.data.content);


        })).catch(errors => {
            console.log(errors.response)
            console.log(errors.request)
        })

    }, [])

    const handleSetup = (name) => {
        let currentSetup = setups.find(setup => setup.name === name);
        currentSetup.active = true;

        let updatedLinks = setups.map(setup => {
            if (setup.name !== name) {
                setup.active = false;
            }
            return {...setup, currentSetup}
        })
        setSetups(updatedLinks);
    }

    return (
        <>
            <ProfileUpload
                open={open}
                handleClose={handleClose}
                handleProfileUpload={handleUploadProfileImage}
                uploadedImage={imageData.url}
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
                    <Sidebar name={userData.firstName}/>
                </Grid>
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
                            <div className="welcome_header">
                                <h2>👋 <span className="greeting">Hi {userData.firstName},</span>
                                    <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="welcome_text">Welcome to Semicolon Task Management</span>
                                </h2>
                            </div>
                            <div className="quote">
                                <img src={QuoteBg} alt="quote background"/>
                                <p className="top-left">"{quote}"</p>
                                <small>-{author}</small>
                                <button className="quote_btn">turn on</button>
                                <Close style={{
                                    position: "absolute",
                                    top: "15px",
                                    right: "20px",
                                    color: "#fff",
                                    cursor: "pointer"
                                }}/>
                            </div>
                        </div>

                        <div className="setup">
                            <h4>Let’s get you started</h4>
                            {setups.map((setup, index) => {
                                return (
                                    <Setup
                                        key={index}
                                        icon={setup.icon}
                                        text={setup.content}
                                        onChecked={handleSetup}
                                        active={setup.active}
                                        name={setup.name}
                                        onUpload={handleClickOpen}
                                        firstName={userData.firstName}
                                    />)
                            })}
                            {/*<TaskWrapper/>*/}
                        </div>
                    </Grid>
                    <Grid item xs={3.5} bgcolor="#FFF" borderRadius={5}>
                        <div className="user_thumb">
                            {setProfilePictureThumb(userData)}
                            <h4 className="name">{userData.firstName + " " + userData.lastName}</h4>
                            <p className="email">{userData.email}</p>
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