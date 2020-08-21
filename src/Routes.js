import React from 'react'
import { Switch } from "react-router-dom";

import Layout from './HOC/Layout'
import PrivateRoute from "./Components/authRoutes/PrivateRoutes";
import PublicRoute from "./Components/authRoutes/PublicRoutes";

import Home from './Components/Home/Home';
import SignIn from './Components/signin';
import Dashboard from './Components/admin/Dashboard';
import AdminMatches from "./Components/admin/matches";
import AddEditMatch from "./Components/admin/matches/AddEditMatch";
import AdminPlayers from "./Components/admin/players";
import AddEditPlayers from "./Components/admin/players/AddEditPlayers";
import TheTeam from "./Components/theTeam";
import TheMatches from "./Components/theMatches";
import ErrorPage from "./Components/UI/404";

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute {...props} component={AdminPlayers} exact path="/admin_players/" />
        <PrivateRoute {...props} component={AddEditPlayers} exact path="/admin_players/add_players/" />
        <PrivateRoute {...props} component={AddEditPlayers} exact path="/admin_players/add_players/:id" />
        <PrivateRoute {...props} component={AddEditMatch} exact path="/admin_matches/edit_match/" />
        <PrivateRoute {...props} component={AddEditMatch} exact path="/admin_matches/edit_match/:id"  />
        <PrivateRoute {...props} component={AdminMatches} exact path="/admin_matches"  />
        <PrivateRoute {...props} component={Dashboard} exact path="/dashboard"  />
        <PublicRoute {...props} restricted={true} component={SignIn} exact path="/sign_in" />
        <PublicRoute {...props} restricted={false} component={Home} exact path="/"  />
        <PublicRoute {...props} restricted={false} component={TheTeam} exact path="/the_team"  />
        <PublicRoute {...props} restricted={false} component={TheMatches} exact path="/the_matches"  />
        <PublicRoute {...props} restricted={false} component={ErrorPage} />
      </Switch>
    </Layout>
  )
}

export default Routes
