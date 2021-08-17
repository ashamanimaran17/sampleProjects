import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import axios from "axios";
import {connect } from 'react-redux';
import { Grid, Box, Button, Typography } from "@material-ui/core";
import styles from 'css/components/eventManager.scss';
import classNames from "classnames/bind";
import {isEmpty} from "lodash";
var cx = classNames.bind(styles);
class TicketManagerNoWrap extends Component {
    constructor(props) {
        super(props);
        this.state={
            eventName: this.props.eventName || "",
            event: {}
        }
    }
    componentDidMount(){
        if (this.props.eventName) {
            this.getEvent();
        }  
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const update={};
        if((nextProps.eventName !== prevState.eventName)) {
            update.eventName = nextProps.eventName;
        }
        return Object.keys(update).length ? update: null;
    }
    componentDidUpdate(prevProps) {
        if (this.props.eventName !== prevProps.eventName) {
            this.getEvent();
        }
      }
    
      getEvent = () =>{
        axios({
            method: "GET",
            url:`/events/getEvent/?eventName=${this.props.eventName}`,
        }).then((response)=>{
            this.setState({event: response.data});
        }).catch((error)=> {
            console.log(error);
        })
      }
    render() {
        return (
                <Fragment>
                    {
                    isEmpty(this.state.event) ? null : 
                    <Grid container direction="column" spacing={2} className={cx("outerContainer")}>
                        <Grid item >
                            <Grid container direction="row" alignItems="center" spacing={2}>
                                <Grid item><Typography variant="subtitle1">Event name:</Typography></Grid>
                                <Grid item><Typography variant="subtitle1">{this.state.event.eventName}</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item><Typography variant="subtitle1">Start date:</Typography></Grid>
                            <Grid item><Typography variant="subtitle1">{this.state.event.startDate.substring(0,16)}</Typography></Grid>
                            <Grid item><Typography variant="subtitle1">End date:</Typography></Grid>
                            <Grid item><Typography variant="subtitle1">{this.state.event.endDate.substring(0,16)}</Typography></Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                        <Grid item><Typography variant="subtitle1">Tickets:</Typography></Grid>
                         <Box component="div" m={3} style={{border: "1px solid grey", padding: "20px", borderRadius:"10px" }}>
                            {this.state.event.tickets.map((ticket, index) => {
                                return (
                                    <Grid container direction="column" spacing={2} key={index}>
                                        <Grid item>
                                            <Grid container direction="row" spacing={2} alignItems="center">
                                                <Grid item xs={1}><Typography variant="subtitle1">Type:</Typography></Grid>
                                                <Grid item xs={2}><Typography variant="subtitle1">{ticket.type}</Typography></Grid>
                                                <Grid item xs={1}><Typography variant="subtitle1">Price:</Typography></Grid>
                                                <Grid item xs={1}><Typography variant="subtitle1">{ticket.price}</Typography></Grid>
                                                <Grid item xs={2}><Typography variant="subtitle1">Available Count:</Typography></Grid>
                                                <Grid item xs={1}><Typography variant="subtitle1">{ticket.maxCount-ticket.sold}</Typography></Grid>
                                              </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                          </Box>
                        </Grid>
                        <Grid item >
                            <Grid container justifyContent="center"><Button onClick={this.handleSaveEvent} variant="contained" color="primary" disableElevation>Save</Button></Grid>
                        </Grid>
                    </Grid>
                }
                </Fragment>
            );
    }
}
const mapStateToProps = state => {
    return {
        eventName: state.eventName
    };
  };
TicketManagerNoWrap.propTypes = {
    eventName: PropTypes.string
}
export const  TicketManager = connect(mapStateToProps, null)(TicketManagerNoWrap);
