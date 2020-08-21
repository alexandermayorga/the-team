import React from 'react'
import Animation from "./Animation";
import Enroll from "./Enroll";

const Promotion = () => {
    return (
        <div className="promotion_wrapper" style={{background:'#ffffff'}}>
            <div className="container">
                <Animation/>
                <Enroll/>
            </div>
        </div>
    )
}

export default Promotion
