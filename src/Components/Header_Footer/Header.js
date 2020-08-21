import React, { Component } from 'react'
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { CityLogo } from "../UI/Icons";

export default class Header extends Component {
    render() {
        return (
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: "#98c5e9",
                    boxShadow: 'none',
                    padding: '10px 0',
                    borderBottom: '2px solid #00285e'
                }}
            >
                <Toolbar style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>
                        <div className="header_logo">
                            <CityLogo
                                link={true}
                                linkTo="/"
                                height="70px"
                                width="70px"
                            />
                        </div>
                    </div>

                    <Link to="/the_team">
                        <Button color="inherit">The Team</Button>
                    </Link>
                    <Link to="/the_matches">
                        <Button color="inherit">Matches</Button>
                    </Link>

                </Toolbar>
            </AppBar>
        )
    }
}
