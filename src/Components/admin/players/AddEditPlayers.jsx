import React, { Component } from 'react'
import AdminLayout from "../../../HOC/AdminLayout";

import FormField from "../../UI/FormField";
import FileUploader from "../../UI/FileUploader";
import { validate } from "../../UI/Misc";

import {
    firebase,
    firebaseDB,
    firebasePlayers
} from "../../../firebase";

export default class AddEditPlayers extends Component {

    state = {
        playerId: '',
        formType: '',
        formError: false,
        formSuccess: null,
        defaultImg: '',
        teams: [],
        formData: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'First Name',
                    name: 'name_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: 'Last Name',
                    name: 'lastname_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Number',
                    name: 'number_input',
                    type: 'number',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            position: {
                element: 'select',
                value: '',
                config: {
                    label: 'Position',
                    name: 'select_position',
                    type: 'select',
                    options: [
                        {key:'Keeper', value:'Keeper'},
                        {key:'Defence', value:'Defence'},
                        {key:'Midfield', value:'Midfield'},
                        {key:'Striker', value:'Striker'},
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            image:{
                element:'image',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,

            }
        }
    }

    updateForm = (element, content='') => {
        const newFormData = { ...this.state.formData }
        const newElement = { ...newFormData[element.id] }

        if (content === ''){
            newElement.value = element.e.target.value;
        }else{
            newElement.value = content;
        }

        const validation = validate(newElement);
        newElement.valid = validation[0]
        newElement.validationMessage = validation[1]

        newFormData[element.id] = newElement

        this.setState({
            formData: newFormData,
            formError: false
        })
    }

    submitForm = (e) => {
        e.preventDefault()

        let dataToSubmit = {};
        let formIsValid = true;

        for (const key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            //Submit Form
            if (this.state.formType === "Edit Player") {
                //Edit
                firebaseDB.ref(`players/${this.state.playerId}`)
                .update(dataToSubmit).then(()=>{
                    this.formSuccess('Player Updated!')
                }).catch(err => {
                    this.setState({formError: true})
                })
            }else{
                firebasePlayers.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_players')
                }).catch(err =>{
                    this.setState({
                        formError: true
                    })
                })
            }
        } else {
            this.setState({
                formError: true
            })
        }

    }

    formSuccess = (message) => {
        this.setState({
            formSuccess: message
        })
        setTimeout(() => {
            this.setState({formSuccess:''})
        }, 2000);
    }

    udpateFields = (playerId, playerData, defaultImg, formType) => {
        const newFormData = {...this.state.formData};

        for (const key in newFormData) {
           newFormData[key].value = playerData[key]
           newFormData[key].valid = true
        }

        this.setState({
            playerId,
            formType,
            defaultImg,
            formData: newFormData,
        })

    }

    componentDidMount() {
        const playerId = this.props.match.params.id;

        if (!playerId) {
            this.setState({ formType: 'Add Player'})
        } else {
            firebaseDB.ref(`players/${playerId}`).once('value')
            .then(snapshot=>{
                const playerData = snapshot.val()

                firebase.storage().ref('players')
                .child(playerData.image).getDownloadURL()
                .then(url=>{
                    this.udpateFields(playerId, playerData, url, 'Edit Player')
                }).catch(e=>{
                    this.udpateFields(playerId, { image: '', ...playerData}, '', 'Edit Player')
                })
            })


        }
    }

    resetImage = () => {
        const newFormData = { ...this.state.formData }
        newFormData['image'].value = ''
        newFormData['image'].valid = false

        this.setState({
            defaultImg:'',
            formData: newFormData
        })
    }

    storeFileName = (filename) => {
        this.updateForm({id:'image'},filename)
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>{this.state.formType}</h2>
                    <div>
                        <form onSubmit={e => this.submitForm(e)}>
                            <FileUploader
                                dir="players"
                                tag={"Player image"}
                                defaultImg={this.state.defaultImg}
                                defaultImgName={this.state.formData.image.value}
                                resetImage={()=>this.resetImage()}
                                filename={(filename) => this.storeFileName(filename)}
                            />
                            <FormField
                                id={'name'}
                                formData={this.state.formData.name}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={'lastname'}
                                formData={this.state.formData.lastname}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={'number'}
                                formData={this.state.formData.number}
                                change={element => this.updateForm(element)}
                            />
                            <FormField
                                id={'position'}
                                formData={this.state.formData.position}
                                change={element => this.updateForm(element)}
                            />

                            {
                                this.state.formSuccess
                                &&
                                <div className="success_label">
                                    {this.state.formSuccess}
                                </div>
                            }
                            {this.state.formError ?
                                <div className="error_label">
                                    Something is wrong
                                </div>
                                : ''
                            }

                            <div className="admin_submit">
                                <button onClick={e => this.submitForm(e)}>
                                    {this.state.formType}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}
