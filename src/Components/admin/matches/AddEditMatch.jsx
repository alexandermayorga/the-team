import React, { Component } from 'react'
import AdminLayout from "../../../HOC/AdminLayout";

import FormField from "../../UI/FormField";
import { validate } from "../../UI/Misc";

import { 
    firebaseTeams, 
    firebaseDB, 
    firebaseMatches,
    firebaseLooper 
} from "../../../firebase";

export default class addEditMatch extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: null,
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event date',
                    name: 'date_input',
                    type: 'date',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a local team',
                    name: 'select_local',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result local',
                    name: 'result_local_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select a away team',
                    name: 'select_away',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result away',
                    name: 'result_away_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text',
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Team result',
                    name: 'select_result',
                    type: 'select',
                    options: [
                        { key: "W", value: 'W' },
                        { key: "L", value: 'L' },
                        { key: "D", value: 'D' },
                        { key: "n/a", value: 'n/a' }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game Played?',
                    name: 'select_final',
                    type: 'select',
                    options: [
                        { key: "Yes", value: 'Yes' },
                        { key: "No", value: 'No' }
                    ]
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
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

    updateFields(match, teamOptions, teams, formType, matchId){
        const newFormData = { ...this.state.formData }

        for (const key in newFormData) {
            if(match){
                newFormData[key].value = match[key]
                newFormData[key].valid = true
            }
            if(key === 'local' || key === "away") {
                newFormData[key].config.options = teamOptions;
            }
        }

        this.setState({
            matchId,
            formType,
            teams,
            formData: newFormData
        })
    }

    successForm(message){
        this.setState({
            formSuccess: message
        })

        setTimeout(() => {
            this.setState({
                formSuccess: null
            })
        }, 2000);
    }

    submitForm(e) {
        e.preventDefault()

        let dataToSubmit = {};
        let formIsValid = true;

        for (const key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        this.state.teams.forEach(team => {
            if (team.shortName === dataToSubmit.local) {
                dataToSubmit['localThmb'] = team.thmb
            }
            if (team.shortName === dataToSubmit.away) {
                dataToSubmit['awayThmb'] = team.thmb
            }
        })

        if (formIsValid) {
            if(this.state.formType === "Edit Match"){
                firebaseDB.ref(`matches/${this.state.matchId}`)
                    .update(dataToSubmit)
                    .then(() => {
                        // this.successForm('Match Updated!')
                        this.props.history.push('/admin_matches')
                    })
                    .catch(e => {
                        this.setState({
                            formError: true
                        })
                    })

            }else{
                //Add MAtch
                firebaseMatches.push(dataToSubmit)
                .then((snapshot)=>{
                    this.successForm('Match Added!')
                    console.log("snapshot", snapshot.key)
                })
            }
        } else {
            this.setState({
                formError: true
            })
        }

    }

    componentDidMount(){
        const matchId = this.props.match.params.id;
        const getTeams = (match, formType) => {
            firebaseTeams.once('value').then(snapshot => {
                const teams = firebaseLooper(snapshot)
                const teamOptions = []

                snapshot.forEach(childSnapshot => {
                    teamOptions.push({
                        key: childSnapshot.val().shortName,
                        value: childSnapshot.val().shortName
                    })
                })

                this.updateFields(match, teamOptions, teams, formType, matchId)

            })
        }

        if(!matchId){
            getTeams(false, 'Add Match')
        }else{
            firebaseDB.ref(`matches/${matchId}`).once('value')
            .then(snapshot =>{
                const match = snapshot.val()

                getTeams(match, 'Edit Match')
            })
        }
    }

    render() {
        return (
            <AdminLayout>
                <div className="editmatch_dialog_wrapper">
                    <h2>{this.state.formType}</h2>

                    <div>
                        <form onSubmit={e => this.submitForm(e) }>
                            <FormField
                                id={'date'}
                                formData={this.state.formData.date}
                                change={element => this.updateForm(element)}
                            />
                            <div className="select_team_layout">
                                <div className="label_inputs">Local</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'local'}
                                            formData={this.state.formData.local}
                                            change={element => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="">
                                        <FormField
                                            id={'resultLocal'}
                                            formData={this.state.formData.resultLocal}
                                            change={element => this.updateForm(element)}
                                        /> 
                                    </div>
                                </div>
                            </div>
                            <div className="select_team_layout">
                                <div className="label_inputs">Away</div>
                                <div className="wrapper">
                                    <div className="left">
                                        <FormField
                                            id={'away'}
                                            formData={this.state.formData.away}
                                            change={element => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="">
                                        <FormField
                                            id={'resultAway'}
                                            formData={this.state.formData.resultAway}
                                            change={element => this.updateForm(element)}
                                        /> 
                                    </div>
                                </div>
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={'referee'}
                                    formData={this.state.formData.referee}
                                    change={element => this.updateForm(element)}
                                /> 
                                <FormField
                                    id={'stadium'}
                                    formData={this.state.formData.stadium}
                                    change={element => this.updateForm(element)}
                                /> 
                            </div>

                            <div className="split_fields">
                                <FormField
                                    id={'result'}
                                    formData={this.state.formData.result}
                                    change={element => this.updateForm(element)}
                                /> 
                                <FormField
                                    id={'final'}
                                    formData={this.state.formData.final}
                                    change={element => this.updateForm(element)}
                                /> 
                            </div>

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
