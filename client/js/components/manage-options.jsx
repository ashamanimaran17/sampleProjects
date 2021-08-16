import React, { Component } from 'react';
import styles from 'css/containers/appLayout.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
import {Toolbar, Button} from '@material-ui/core'
import {Link} from "react-router-dom";
import { withRouter } from "react-router";
class ManageOptionsTabNoWrap extends Component {
    constructor(props) {
        super(props);
        this.state={
            selected: ""
        }
    }
  static getDerivedStateFromProps(nextProps, prevState) {
        const update={};
        if(nextProps.location.pathname !== prevState.selected){
            update.selected= nextProps.location.pathname ;
        }
        return Object.keys(update).length ? update: null;
    }
    
    
    render() {
        return (
            <Toolbar className={cx("navButton")}>
            <Button  to="/ticketManager" component={Link} className={cx("navButton")} color={this.state.selected === "/ticketManager" ? "primary" : ""}>Buy Tickets</Button>
            <Button  to="/eventManager" component={Link} className={cx("navButton")} color={this.state.selected === "/eventManager" ? "primary" : ""}>Manage Events</Button>
            </Toolbar>
        );
    }
}
export const ManageOptionsTab = withRouter(ManageOptionsTabNoWrap);