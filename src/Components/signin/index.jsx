import React, { Component } from 'react'
import { firebase } from "../../firebase";
import FormField from "../UI/FormField";
import { validate } from "../UI/Misc";

export default class SignIn extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your Password'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateForm(element) {
        const newFormData = { ...this.state.formData }
        const newElement = { ...newFormData[element.id] }

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
    async submitForm(e) {
        e.preventDefault()

        let dataToSubmit = {};
        let formIsValid = true;

        for (const key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            try {
                const auth =  firebase.auth().signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)

                if(auth) {
                    this.props.history.push('/dashboard')
                }
                else {
                    this.setState({
                        formError: true
                    })
                }

            } catch (error) {
                console.log('user is Auth')
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
            <div className="container">
                <div className="signin_wrapper" style={{margin:'100px'}}>
                    <form onSubmit={e => this.submitForm(e)}>
                        <h2>Sign In</h2>

                        {this.state.formError ?
                            <div className="error_label">Something is wrong. Try again</div>
                            : null
                        }

                        <FormField
                            id='email'
                            formData={this.state.formData.email}
                            change={element => this.updateForm(element)}
                        />

                        <FormField
                            id='password'
                            formData={this.state.formData.password}
                            change={element => this.updateForm(element)}
                        />
                        <button onClick={e => this.submitForm(e)}>Sign In</button>
                    </form>
                </div>
            </div>
        )
    }
}
