import React, { Component, Fragment } from 'react';
import { TextField, Grid, FormControl, IconButton, Box, Button } from "@material-ui/core";
import styles from 'css/components/eventManager.scss';
import { withStyles } from '@material-ui/styles';
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import moment from "moment";
import {cloneDeep, isEqual} from 'lodash';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import axios from "axios";
var cx = classNames.bind(styles);
const themeStyles = () => ({
})
class EventManagerNoWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: this.props.eventName || "",
            currentDate: moment().format("YYYY-MM-DDT00:00"),
            startDate: this.props.startDate || moment().format("YYYY-MM-DDT00:00"),
            endDate: this.props.endDate || moment().format("YYYY-MM-DDT00:00"),
            tickets: this.props.tickets || []
        }
        this.emptyTicket={type:"",price: 0, maxCount:0, sold:0};
    }
    componentDidMount(){
        let tempTickets = cloneDeep(this.props.tickets);
        if(tempTickets && tempTickets.length){
            tempTickets.push(this.emptyTicket)
        } else{
            tempTickets= [this.emptyTicket];
        }
        this.setState({tickets: tempTickets});

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const update={};
        if( nextProps.tickets && nextProps.tickets.length && !isEqual(nextProps.tickets, prevState.tickets)){
            let tempTickets = cloneDeep(nextProps.tickets);
            tempTickets.push(this.emptyTicket);
            update.tickets= tempTickets ;
        }
        return Object.keys(update).length ? update: null;
    }
    
    handleEventChanged = (event) => {
        this.setState({ eventName: event.target.value })
    }
    handleStartDateChanged = (event) => {
        this.setState({ startDate: event.target.value })
    }
    handleEndDateChanged = (event) => {
        this.setState({ endDate: event.target.value })
    }
    handleTypeChanged = (event, index) => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets[index]["type"] = event.target.value;
        this.setState({tickets: tempTickets});
    }
    handleTicketPriceChanged = (event, index) => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets[index]["price"] = event.target.value;
        this.setState({tickets: tempTickets});
    }
    handleTicketMaxCountChanged = (event, index) => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets[index]["maxCount"] = event.target.value;
        this.setState({tickets: tempTickets});
    }
    handleAddTicket = () => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets.push(this.emptyTicket);
        this.setState({tickets: tempTickets});
    }
    handleRemoveTicket = (index) => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets.splice(index, 1);
        this.setState({tickets: tempTickets});
    }
    handleSaveEvent = ()=> {
        axios({
            method: "POST",
            url:"/events/add",
            data:{
                eventName: this.state.eventName,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                tickets: this.state.tickets
            }
        }).then((response)=>{
            console.log(response);
        }).catch((error)=> {
            console.log(error);
        })
    }
    render() {
        return (
            <Fragment>
                <Grid container direction="column" spacing={2} className={cx("outerContainer")}>
                    <Grid item >
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item><FormControl ><label>Event name:</label></FormControl></Grid>
                            <Grid item>
                                <TextField id="eventName" value={this.state.eventName} onChange={this.handleEventChanged} variant="outlined" size="small"></TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item><FormControl><label>Date:</label></FormControl></Grid>
                            <Grid item>
                                <TextField
                                    id="startDate"
                                    label="start"
                                    type="datetime-local"
                                    value={this.state.startDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size="small"
                                    onChange={this.handleStartDateChanged}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    id="endDate"
                                    label="end"
                                    type="datetime-local"
                                    value={this.state.endDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size="small"
                                    onChange={this.handleEndDateChanged}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                     <FormControl><label>Tickets:</label></FormControl>
                     <Box component="div" m={3} style={{border: "1px solid grey", padding: "20px", borderRadius:"10px" }}>
                        {this.state.tickets.map((ticket, index) => {
                            return (
                                <Grid container direction="row" spacing={2} key={index}>
                                    <Grid item>
                                        <Grid container direction="row" spacing={2} alignItems="center">
                                            <Grid item><Grid item><FormControl ><label>Type:</label></FormControl></Grid></Grid>
                                            <Grid item><TextField id="eventName" value={ticket.type} onChange={(event) => this.handleTypeChanged(event, index)} variant="outlined" size="small"></TextField></Grid>
                                            <Grid item><Grid item><FormControl ><label>Price:</label></FormControl></Grid></Grid>
                                            <Grid item><TextField id="eventName" value={ticket.price} onChange={(event) => this.handleTicketPriceChanged(event, index)} variant="outlined" size="small"></TextField></Grid>
                                            <Grid item><Grid item><FormControl ><label>Count:</label></FormControl></Grid></Grid>
                                            <Grid item><TextField type="number" id="eventName" value={ticket.maxCount} onChange={(event) => this.handleTicketMaxCountChanged(event, index)} variant="outlined" size="small"></TextField></Grid>
                                            <IconButton onClick={this.handleAddTicket}><AddCircleOutlineIcon/></IconButton>
                                            <IconButton onClick={() => this.handleRemoveTicket(index)} disabled={this.state.tickets.length <= 1}><RemoveCircleOutlineIcon/></IconButton>
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
            </Fragment>
        );
    }
}

EventManagerNoWrap.propTypes = {
    eventName: PropTypes.string,
    startDate: PropTypes.date,
    endDate: PropTypes.date,
    tickets: PropTypes.array,
    classNames: PropTypes.any
}
export const EventManager = withStyles(themeStyles)(EventManagerNoWrap);
