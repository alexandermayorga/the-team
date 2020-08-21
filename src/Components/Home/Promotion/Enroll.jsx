import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import FormField from "../../UI/FormField";
import { validate } from "../../UI/Misc";
import { firebasePromotions } from "../../../firebase";

export default class Enroll extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formData:{
            email:{
                element:'input',
                value:'',
                config: {
                    name:'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateForm(element){
        const newFormData = {...this.state.formData}
        const newElement = {...newFormData[element.id]}

        newElement.value = element.e.target.value;

        const validation = validate(newElement);
        newElement.valid = validation[0]
        newElement.validationMessage = validation[1]

        newFormData[element.id] = newElement

        this.setState({
            formData: newFormData,
            formError: false
        })

    }

    resetForm(type){
        const newFormData = {...this.state.formData}

        for (const key in newFormData) {
            newFormData[key].value = ''
            newFormData[key].valid = false
            newFormData[key].validationMessage = ''
        }

        this.setState({
            formError: false,
            formData: newFormData,
            formSuccess: type ? "You are now Enrolled!" : "Already Enrolled"
        })

        this.clearSuccessMessage()
    }

    clearSuccessMessage(){
        setTimeout(() => {
            this.setState({
                formSuccess: ""
            })
        }, 2000);
    }

    async submitForm(e){
        e.preventDefault()

        let dataToSubmit = {};
        let formIsValid = true;

        for (const key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }
        
        if (formIsValid) {
            try {
                const snapshot = await firebasePromotions
                    .orderByChild('email')
                    .equalTo(dataToSubmit.email)
                    .once('value')

                if (snapshot.val() === null) {
                    firebasePromotions.push(dataToSubmit)
                    this.resetForm(true);
                } else {
                    this.resetForm(false);
                }
            } catch (error) {
                this.setState({
                    formError: true
                })  
            }

        } else {
            this.setState({
                formError: true
            })            
        }

    }

    render() {
        return (
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={ e => this.submitForm(e)}>
                        <div className="enroll_title">
                            Enter your email
                        </div>
                        <div className="enroll_input">
                            <FormField
                                id='email'
                                formData={this.state.formData.email}
                                change={element => this.updateForm(element)}
                            />
                            {this.state.formError ? 
                                <div className="error_label">Something is wrong. Try again</div>
                                :null
                            }
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button onClick={e => this.submitForm(e)}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        )
    }
}
