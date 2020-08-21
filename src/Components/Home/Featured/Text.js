import React, { Component } from 'react'
import { easePolyOut } from "d3-ease";
import { Animate } from "react-move";

import FeaturePlayerImg from '../../../Resources/images/featured_player.png'

export default class Text extends Component {
    elements = [
        {
            text: "",
            className: "featured_player",
            duration: 500,
            delay: 800,
            rotate: 0,
            startX: 550,
            startY: 201,
            endX: 550,
            endY: 201,
            backgroundImg: `url(${FeaturePlayerImg})`
        },
        {
            text: "3",
            className: "featured_number",
            duration: 1000,
            rotate: 360,
            startX: 260,
            startY: 170,
            endX: 260,
            endY: 170
        },
        {
            text: "League",
            className: "featured_first",
            duration: 500,
            rotate: 0,
            startX: 503,
            startY: 450,
            endX: 273,
            endY: 450
        },
        {
            text: "Championships",
            className: "featured_second",
            duration: 500,
            rotate: 0,
            startX: 503,
            startY: 586,
            endX: 273,
            endY: 586,
            delay: 300
        }
    ]

    animateElem = (elems) => {
        return elems.map((elem, i) => (
            <Animate
                key={i}
                show={true}
                start={{
                    opacity: 0,
                    rotate: 0,
                    x: [elem.startX || 0],
                    y: [elem.startY || 0]
                }}
                enter={{
                    opacity: [1],
                    rotate: [elem.rotate],
                    timing: { duration: elem.duration, ease: easePolyOut , delay: elem.delay || 0 },
                    x: [elem.endX],
                    y: [elem.endY]
                }}
            >
                {(state) => {
                    return (
                        <div
                            className={elem.className}
                            style={{
                                opacity: state.opacity,
                                transform: `translate(${state.x}px,${state.y}px) rotateY(${state.rotate}deg)`,
                                background: elem.backgroundImg || null
                            }}
                        >
                            {elem.text}
                        </div>
                    )
                }}
            </Animate>
        ))
    }

    render() {
        return this.animateElem(this.elements)
    }
}
