import React, { Component } from 'react'
import { firebase } from "../../firebase";
import FirebaseFileUploader  from "react-firebase-file-uploader";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class FileUploader extends Component {

    state = {
        name:'',
        isUploading:false,
        fileURL: ''
    }

    static getDerivedStateFromProps(props,state){
        if(props.defaultImg){
            return state ={
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }
        return null
    }

    handleUploadStart = () =>{
        this.setState({isUploading:true})
    }
    handleUploadError = () => {
        this.setState({ isUploading: false })
    }
    handleUploadSuccess = async(filename) =>{
        this.setState({
            name:filename,
            isUploading:false
        })

        try {
            const fileURL = await firebase.storage().ref(this.props.dir)
                .child(filename).getDownloadURL()
                
            this.setState({fileURL})
        } catch (error) {
            //Handle Error
        }

        this.props.filename(filename)
    }

    removeImage = () => {
        this.setState({
            name: '',
            isUploading: false,
            fileURL: ''
        })
        //TODO: Delete Image from Firebase
        this.props.resetImage()
    }

    render() {
        return (
            <div>
                {!this.state.fileURL ?
                    <div>
                        <div className="label_inputs">{this.props.tag}</div>
                        <FirebaseFileUploader
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>
                    :
                    <div className="image_upload_container">
                        <img 
                            style={{width:"100%"}}    
                            src={this.state.fileURL} 
                            alt={this.state.name}/>
                        <div className="remove" onClick={() => this.removeImage()}>
                            Remove
                        </div>
                    </div>
                }
                {this.state.isUploading 
                && 
                <div className="progress"
                    style={{textAlign:'center',margin:'30px 0'}}
                >
                    <CircularProgress
                        style={{color:'#98c6e9'}}
                        thickness={7}
                    />
                </div>
                }
            </div>
        )
    }
}
