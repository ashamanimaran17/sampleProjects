import React, { Component } from 'react';
import { withRouter } from "react-router";
import { PropTypes } from 'prop-types';
class HomeNoWrap extends Component {
    componentDidMount(){
        this.props.history.replace("/ticketManager");
    }
    render() {
        return (
            <div/>
        );
    }
}
HomeNoWrap.propTypes = {
    history: PropTypes.object
}
export const Home = withRouter(HomeNoWrap);