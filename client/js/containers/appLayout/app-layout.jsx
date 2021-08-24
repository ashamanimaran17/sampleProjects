import React, {Component} from "react";
import {AppHeader} from "containers/appHeader/app-header.jsx";
import {SideNav} from "containers/sideNav/side-nav";
import {Grid} from "@material-ui/core";
import {Switch, Route} from "react-router-dom";
import {EventManager} from "components/EventManager/event-manager";
import {TicketManager} from "components/TicketManager/ticket-manager";
import {ManageOptionsTab} from "components/manage-options";
import {Home} from "components/home/home";
import {connect } from 'react-redux';
import PropTypes from "prop-types";
import { v1 as uuidv1 } from 'uuid';
class AppLayoutNoWrap extends Component{
    constructor(props) {
        super(props);
        this.state={
            eventName: ""
        }
        this.sideNavRef= React.createRef();
    }
    onHandleEventSelect=(eventName)=>{
       this.props.onEventSelected(eventName)
    }
    onHandleDataUpdate = () => {
        this.sideNavRef.current.update();
    }
render(){
    return(
        <div>
            <AppHeader/>
            <Grid container style={{minHeight: "100vh"}}>
                <Grid item xs={3} >
                <SideNav handleEventSelect={this.onHandleEventSelect} ref={this.sideNavRef}></SideNav>
                </Grid>
                <Grid item xs={9}>
                <ManageOptionsTab/>
                <Switch>
                <Route path="/ticketManager" ><TicketManager key={uuidv1()}/></Route>
                <Route path="/eventManager" ><EventManager key={uuidv1()} handleDataUpdate={this.onHandleDataUpdate}/></Route>
                <Route path="/" component={Home} />   
                </Switch>
                </Grid>
            </Grid>
        </div>
    )
}
}
function mapDispatchToProps(dispatch) {
    return {
        onEventSelected: (eventName) => dispatch({type: 'EVENT_SELECTED', value: eventName})
    }
}
AppLayoutNoWrap.propTypes = {
    onEventSelected: PropTypes.func
}
export const AppLayout = connect(null, mapDispatchToProps)(AppLayoutNoWrap);