import React, { Component } from 'react'
import { firebaseMatches, firebaseLooper } from "../../../firebase";
import MatchesBlock from '../../UI/MatchesBlock';
import { Slide } from "react-reveal";

export default class Blocks extends Component {

    state = {
        matches: []
    }

    async componentDidMount(){
        try {
            const snapshot = await firebaseMatches.limitToLast(6).once('value');
            const matches = firebaseLooper(snapshot).reverse();
            this.setState({ matches })
        } catch (error) {
            console.log(error)
        }
    }

    showMatches = (matches) => ( 
        matches ?
            matches.map(match => (
                <Slide key={match.id} bottom>
                    <div className="item">
                        <div className="wrapper">
                            <MatchesBlock match={match}/>
                        </div>
                    </div>
                </Slide>
            ))
            :null
    )

    render() {
        return (
            <div className="home_matches">
                {this.showMatches(this.state.matches)}
            </div>
        )
    }
}
