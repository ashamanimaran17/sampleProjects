import React, { Component } from 'react';
import axios from "axios";
import styles from 'css/containers/sideNav.scss';
import classNames from "classnames/bind";
import Typography from '@material-ui/core/Typography';
import PropTypes from "prop-types";
var cx = classNames.bind(styles);
class SideNavNoWrap extends Component {
    constructor(props) {
        super(props);
        this.state={
            events: []
        }
    }
    handleEventSelected = (value) => {
        this.props.handleEventSelect(value);
    }
    componentDidMount(){
        this.getData();
    }
    update = () => {
        this.getData();
    }
    getData = () => {
        axios({
            method: "GET",
            url:"/events/get",
        }).then((response)=>{
            this.setState({events: response.data});
            console.log(response).data;
        }).catch((error)=> {
            console.log(error);
        })
    }
    render() {
        return (
            <div className={cx("sideNav")}>
                <Typography variant="overline">Events</Typography>
                <ul>
                {this.state.events.map((item, index)=> {
                    return(
                        <li key={index}><Typography variant="body1" color="primary" onClick={()=>this.handleEventSelected(item.eventName)}>{item.eventName}</Typography></li>
                    )
                })}
                </ul>
            </div>
        );
    }
}
SideNavNoWrap.propTypes = {
    handleEventSelect: PropTypes.func
}
export const SideNav = SideNavNoWrap;
