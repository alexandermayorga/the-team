import React from 'react'
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase";

const AdminNAv = () => {

    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Add Match',
            linkTo: '/admin_matches/edit_match'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        },
        {
            title: 'Add Player',
            linkTo: '/admin_players/add_players'
        },
    ]

    const style = {
        color: '#fff',
        fontWeight: '300',
        borderBottom: '1px solid #353535'
    }

    const renderItems = () => (
        links.map(link => (
            <Link key={link.title} to={link.linkTo}>
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    )

    const logoutHandler = () => {
        firebase.auth().signOut().then(()=>{
            console.log('logged out!')
        },(error)=>{
            console.log('Error logging out')
        })
    }

    return (
        <div>
            {renderItems()}
            <ListItem button style={style} onClick={logoutHandler}>
                Log Out
            </ListItem>
        </div>
    )
}

export default AdminNAv
