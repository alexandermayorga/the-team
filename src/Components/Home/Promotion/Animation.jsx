import React from 'react'
import { Zoom } from "react-reveal";
import Jersey from "../../../Resources/images/jersey.jpg";

export default function Animation() {
    return (
        <div className="promotion_animation">
            <div className="left">
                <Zoom>
                    <div style={{ color: '#98c5e9' }}>
                        <span>Win a</span>
                        <span>Jersey</span>
                    </div>
                </Zoom>
            </div>
            <div className="right">
                <Zoom>
                    <div style={{ background: `url(${Jersey}) no-repeat` }}></div>
                </Zoom>
            </div>
        </div>
    )
}
