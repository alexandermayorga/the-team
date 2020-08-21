import React from 'react'
import { Tag } from "../../UI/Misc";
import Blocks from './Blocks';

const Matches = () => {
    return (
        <div className="home_matches_wrapper">
            <div className="container">
                <Tag
                    bck="#0e1731"
                    size="50px"
                    color="#ffffff"
                >
                    Matches
                </Tag>

                <Blocks/> 

                <Tag
                    link={true}
                    linkTo='/the_team'
                    bck="#ffffff"
                    size="22px"
                    color="#0e1731"
                >
                    See more matches
                </Tag>
            </div>
        </div>
    )
}

export default Matches
