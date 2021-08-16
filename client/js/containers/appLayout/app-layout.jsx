import React, {Component} from "react";
import {AppHeader} from "containers/appHeader/app-header.jsx";
import {SideNav} from "containers/sideNav/side-nav";
import {Grid} from "@material-ui/core";
import {Switch, Route} from "react-router-dom";
import {EventManager} from "components/EventManager/event-manager";
import {TicketManager} from "components/TicketManager/ticket-manager";
import {ManageOptionsTab} from "components/manage-options";
import {Home} from "components/home/home";
export class AppLayout extends Component{
render(){
    return(
        <div>
            <AppHeader/>
            <Grid container>
                <Grid item xs={3}>
                <SideNav></SideNav>
                </Grid>
                <Grid item xs={9}>
                <ManageOptionsTab/>
                <Switch>
                <Route path="/ticketManager" component={TicketManager}></Route>
                <Route path="/eventManager" component={EventManager}></Route>
                <Route exact path="/" component={Home} />
                </Switch>
                </Grid>
            </Grid>
        </div>
    )
}
}