import React, {useState} from 'react';
import DragDrop from "./Drag&Drop";
import CancelIcon from '@mui/icons-material/Cancel';
import SuccessfulUploadIcon from "../../images/SuccessUploadIcon.svg";
import ReactDOM from "react-dom";

const ProfileUpload = ({
                           handleProfileUpload,
                           uploadedImage,
                           open,
                           handleClose,
                           upload,
                           isUploaded,
                           handleIsUploaded
                       }) => {
    const [isUploading, setIsUploading] = useState(false);
    const disabledStyle = {
        background: (!uploadedImage || isUploading) && "rgb(55, 84, 219, 0.2)",
        cursor: isUploading && "none",
    }


    const handleUpload = () => {
        setIsUploading(true);
        upload();
    }

    const onHandlePopUp = () => {
        setIsUploading(false);
        handleIsUploaded(false)
        handleClose();
    }

    return (
        ReactDOM.createPortal(
            <>
                <div className="backdrop" onClick={onHandlePopUp} style={{display: open ? "block" : "none"}}/>
                <div className="popup upload_container " style={{display: open ? "block" : "none"}}>
                    <CancelIcon sx={{
                        position: "absolute",
                        right: "4%",
                        top: "3%",
                        cursor: "pointer"
                    }}
                                onClick={onHandlePopUp}
                    />
                    {isUploaded ? <h3>Profile picture taken</h3> : <h3>Upload your image</h3>}
                    <DragDrop apiCall={handleProfileUpload} imagePath={uploadedImage} isUploaded={isUploaded}/>
                    {isUploaded ?
                        <img src={SuccessfulUploadIcon} alt="success icon" className="image_successful_icon"/> :
                        <div className="upload_btn_wrapper">
                            <button disabled={!uploadedImage || isUploading} style={disabledStyle}
                                    className="upload_btn"
                                    onClick={handleUpload}>{isUploading ? "Uploading..." : "Upload Image"}</button>
                        </div>}
                </div>
            </>, document.getElementById("profile-popup"))
    );
};

export default ProfileUpload;