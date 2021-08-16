import React, { Component } from 'react';
import { withRouter } from "react-router";
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

export const Home = withRouter(HomeNoWrap);