import React, { Component } from 'react'
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

import { firebasePlayers, firebase, firebaseLooper } from "../../../firebase";
import { Promise } from "core-js";

import PlayerCard from "../../UI/PlayerCard";

export default class Cards extends Component {

    state = {
        show: this.props.show,
        cards: [
            { left:300, bottom:90, zIndex: 0 },
            { left:200, bottom:60, zIndex: 1 },
            { left:100, bottom:30, zIndex: 2 },
            { left:0, bottom:0, zIndex: 3 }
        ],
        players: [],
        playersLoaded: false
    }

    componentDidMount = async () =>{
        console.log('[componentDidMount]')
        try {
            const snapshot = await firebasePlayers.once('value')
            const players = firebaseLooper(snapshot);
            let promises = []

            for (const key in players) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('players')
                            .child(players[key].image).getDownloadURL()
                            .then(url => {
                                players[key].url = url
                                resolve()
                            }).catch(err => {
                                console.log(err)
                                reject()
                            })
                    })
                )
            }

            Promise.all(promises).then(() => {
                const newCards = this.responsiveSettings();
                const newPlayers = [players[18],players[1],players[14],players[8]]

                this.setState({
                    players: newPlayers,
                    cards: newCards,
                    playersLoaded: true
                })
            })

        } catch (error) {
            console.log(error)
        }
    }


    componentDidUpdate = ()=>{
        if (this.cardSwitcher) clearTimeout(this.cardSwitcher);       

        this.cardSwitcher = setTimeout(() => {
            let newCards = [...this.state.cards];
            const firstCard = newCards.shift();
            newCards.push(firstCard)

            this.setState({ cards: newCards })
        }, 4000);
    }
 

    responsiveSettings = ()=> {
        const windowWidth = window.outerWidth;

        if (windowWidth > 615) return [...this.state.cards];
        
        const playerCardWidth = 300;
        const gutters = 30;

        const availableSpace = windowWidth - (playerCardWidth + gutters);

        const newCards = this.state.cards.map((card,i) => {
            const push = (availableSpace/3) * i;
            return { left: push, bottom: card['bottom'], zIndex: card['zIndex'] }
        });

        return newCards

    }

    showAnimateCards = () => (
        this.state.cards.map((card, i) => (
            <Animate
                key={i}
                show={this.props.show}
                start={{ left: 0, bottom: 0, zIndex: 0 }}
                enter={{
                    left: [card.left],
                    bottom: [card.bottom],
                    zIndex: [card.zIndex],
                    timing: { duration: 500, ease: easePolyOut },
                }}
                update={() => ({
                    left: [card.left],
                    bottom: [card.bottom],
                    zIndex: [card.zIndex],
                    timing: { duration: 500, ease: easePolyOut }
                })}
            >
                {({ left, bottom, zIndex }) => (
                    <div style={{
                        position: "absolute",
                        left,
                        bottom,
                        zIndex,
                        transition: 'all .55s',
                    }}>
                        <PlayerCard
                            number={this.state.players[i].number}
                            name={this.state.players[i].name}
                            lastname={this.state.players[i].lastname}
                            bck={this.state.players[i].url}
                        />
                    </div>
                )}
            </Animate>
        ))
    )

    render() {
        return (
            <div>
                {this.state.playersLoaded ? this.showAnimateCards() : null}
            </div>
        )
    }
}
