import React, { Component } from 'react'
import { Link } from "react-router-dom";
import AdminLayout from "../../../HOC/AdminLayout";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebasePlayers, firebaseLooper } from "../../../firebase";

export default class AdminPlayers extends Component {

    state = {
        isLoading: true,
        players: []
    }

    componentDidMount() {
        firebasePlayers.once('value').then(snapshot => {
            const players = firebaseLooper(snapshot)

            this.setState({
                players: players.reverse(),
                isLoading: false
            })
        })
    }

    render() {
        return (
            <AdminLayout>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.players.map((player, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Link to={`/admin_players/add_players/${player.id}`}>
                                            {player.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/add_players/${player.id}`}>
                                            {player.lastname}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/add_players/${player.id}`}>
                                            {player.number}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin_players/add_players/${player.id}`}>
                                            {player.position}
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className="admin_progress">
                    {this.state.isLoading && <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />}
                </div>
            </AdminLayout>
        )
    }
}
