import {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import Svg from "../../images/profileImage.svg"

const uploadImage = (getRootProps, isDragActive, getInputProps, imagePath, isUploaded) => {
    const uploadStyle = {
        background: "rgba(68, 68, 68, 0.8)"
    }
    console.log("Upload", isUploaded)
    return (
        <div className="wrapper" {...getRootProps()} style={{background: isDragActive && "rgba(82,82,82,0.2)"}}>
            <input type="text" {...getInputProps()}/>
            <img src={imagePath ? imagePath : Svg} alt="upload icon"/>
            {isDragActive ? <></> : <p className="upload_message" style={isUploaded ? {display: "none"} : uploadStyle}>tap or drag & drop to select picture</p>}
        </div>

    );
}

const DragDrop = ({apiCall, imagePath, isUploaded}) => {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        console.log(file)
        apiCall(file)
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return uploadImage(getRootProps, isDragActive, getInputProps, imagePath, isUploaded);
};

export default DragDrop;