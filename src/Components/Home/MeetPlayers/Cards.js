import React, { Component } from 'react'
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";
import Otamendi from "../../../Resources/images/players/Otamendi.png";
import PlayerCard from "../../UI/PlayerCard";

export default class Cards extends Component {

    state = {
        show: this.props.show,
        cards: [
            { left:300, bottom:90 },
            { left:200, bottom:60 },
            { left:100, bottom:30 },
            { left:0, bottom:0 }
        ]
    }

    showAnimateCards = () => (
        this.state.cards.map((card,i)=>(
            <Animate
                key={i}
                show={this.props.show}
                start={{left: 0, bottom: 0}}
                enter={{
                    left: [card.left], 
                    bottom: [card.bottom],
                    timing: {duration: 500, ease: easePolyOut}
                }}
            >
                {({left, bottom})=>(
                    <div style={{
                        position: "absolute",
                        left,
                        bottom,
                    }}>
                        <PlayerCard
                            number="30"
                            name="Nicolas"
                            lastname="Otamendi"
                            bck={Otamendi}
                        />
                    </div>
                )}
            </Animate>
        ))
    )

    render() {
        return (
            <div>
                {this.showAnimateCards()}
            </div>
        )
    }
}
