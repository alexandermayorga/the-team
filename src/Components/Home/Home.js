import React from 'react'
import Featured from './Featured/Featured'
import Matches from './Matches/Matches'
import MeetPlayers from './MeetPlayers/MeetPlayers'
import Promotion from "./Promotion/Promotion";

const Home = () => {
    return (
        <div className="bck_blue">
            <Featured/>
            <Matches/>
            <MeetPlayers/>
            <Promotion/>
        </div>
    )
}

export default Home
