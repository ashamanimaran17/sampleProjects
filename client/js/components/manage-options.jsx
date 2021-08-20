import React, { Component } from 'react';
import styles from 'css/containers/appLayout.scss';
import classNames from "classnames/bind";
var cx = classNames.bind(styles);
import {Toolbar, Button} from '@material-ui/core'
import {Link} from "react-router-dom";
import { withRouter } from "react-router";
import { PropTypes } from 'prop-types';
class ManageOptionsTabNoWrap extends Component {
  
    render() {
        return (
            <Toolbar className={cx("navButton")}>
            <Button  to="/ticketManager" component={Link} className={cx("navButton")} color={this.props.location.pathname === "/ticketManager" ? "primary" : "default"}>Buy Tickets</Button>
            <Button  to="/eventManager" component={Link} className={cx("navButton")} color={this.props.location.pathname === "/eventManager" ? "primary" : "default"}>Manage Events</Button>
            </Toolbar>
        );
    }
}
ManageOptionsTabNoWrap.propTypes = {
    location: PropTypes.object
}
export const ManageOptionsTab = withRouter(ManageOptionsTabNoWrap);