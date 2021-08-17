import React, { Component, Fragment } from 'react';
import { TextField, Grid, FormControl, IconButton, Box, Button, Typography } from "@material-ui/core";
import styles from 'css/components/eventManager.scss';
import { withStyles } from '@material-ui/styles';
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import moment from "moment";
import { cloneDeep } from 'lodash';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import axios from "axios";
import { connect } from 'react-redux';
var cx = classNames.bind(styles);
const themeStyles = () => ({
})
class EventManagerNoWrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queriedEventName: this.props.queriedEventName || "",
            eventName: "",
            startDate: moment().format("YYYY-MM-DDT00:00"),
            endDate: moment().format("YYYY-MM-DDT00:00"),
            tickets: [{ type: "", price: 0, maxCount: 0, sold: 0 }],
            operation: "",
            errors: {
                eventName: "",
                date: "",
                tickets: ""
            }
        }
        this.emptyTicket = { type: "", price: 0, maxCount: 0, sold: 0 };
    }
    componentDidMount() {
        if (this.props.queriedEventName) {
            this.getEvent();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const update = {};
        if ((nextProps.queriedEventName !== prevState.queriedEventName)) {
            update.queriedEventName = nextProps.queriedEventName;
        }
        return Object.keys(update).length ? update : null;
    }
    componentDidUpdate(prevProps) {
        if (this.props.queriedEventName !== prevProps.queriedEventName) {
            this.getEvent();
        }
    }
    getEvent = () => {
        axios({
            method: "GET",
            url: `/events/getEvent/?eventName=${this.props.queriedEventName}`,
        }).then((response) => {
            this.setState({ eventName: response.data.eventName, startDate: response.data.startDate, endDate: response.data.endDate, tickets: response.data.tickets, operation: "edit" });
            this.clearErrors();
        }).catch((error) => {
            console.log(error);
        })
    }

    handleEventChanged = (event) => {
        this.setState({ eventName: event.target.value, errors: {}})
    }
    handleStartDateChanged = (event) => {
        this.setState({ startDate: event.target.value, errors: {} })
    }
    handleEndDateChanged = (event) => {
        this.setState({ endDate: event.target.value, errors: {} })
    }
    handleTypeChanged = (event, index) => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets[index]["type"] = event.target.value;
        this.setState({ tickets: tempTickets, errors: {} });
    }
    handleTicketPriceChanged = (event, index) => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets[index]["price"] = event.target.value;
        this.setState({ tickets: tempTickets, errors: {} });
    }
    handleTicketMaxCountChanged = (event, index) => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets[index]["maxCount"] = event.target.value;
        this.setState({ tickets: tempTickets, errors: {} });
    }
    handleAddTicket = () => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets.push(this.emptyTicket);
        this.setState({ tickets: tempTickets, errors: {} });
    }
    handleRemoveTicket = (index) => {
        let tempTickets = cloneDeep(this.state.tickets);
        tempTickets.splice(index, 1);
        this.setState({ tickets: tempTickets, errors: {} });
    }
    validate = () => {
        let isValid = true;
        const tempErrors = { eventName: "", date: "", tickets: "" };
        if (this.state.eventName) {
            tempErrors.eventName = "";
        } else {
            tempErrors.eventName = "Required";
            isValid = false;
        }
        if (moment(this.state.startDate) < moment(this.state.endDate)) {
            tempErrors.date = "";
        } else {
            tempErrors.date = "Start date greater than or equal to end date";
            isValid = false;
        }
        this.state.tickets.forEach((ticket) => {
            if ((ticket.type.length > 0) && (!isNaN(ticket.price)) && (!isNaN(ticket.maxCount))) {
                tempErrors.tickets = "";
            } else {
                tempErrors.tickets = "Please check the entries";
                isValid = false;
            }
        });
        this.setState({ errors: tempErrors });
        return isValid;
    }
    handleSaveEvent = () => {
        this.validate() && this.save();
    }
    save = () => {
        axios({
            method: "POST",
            url: "/events/add",
            data: {
                eventName: this.state.eventName,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                tickets: this.state.tickets
            }
        }).then((response) => {
            this.handleCreateNewEvent();
            console.log(response);
            this.props.handleDataUpdate();
            this.clearErrors();
        }).catch((error) => {
            console.log(error);
        })
    }
    handleCreateNewEvent = () => {
        this.setState({
            eventName: "",
            startDate: moment().format("YYYY-MM-DDT00:00"),
            endDate: moment().format("YYYY-MM-DDT00:00"),
            tickets: [{ type: "", price: 0, maxCount: 0, sold: 0 }],
            operation: "create"
        });
        this.clearErrors();
    }
    clearErrors = ()=> {
        this.setState({errors: {}});
    }
    render() {
        return (
            <Fragment>
                <Grid container direction="column" spacing={2} className={cx("outerContainer")} onFocus={this.clearErrors}>
                    <Grid item >
                        <Grid container direction="row" justifyContent="flex-end" spacing={2}>
                            <Button variant="contained" color="primary" onClick={this.handleCreateNewEvent}>Create Event</Button>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item><FormControl ><label>Event name:</label></FormControl></Grid>
                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item> <TextField id="eventName" value={this.state.eventName} onChange={this.handleEventChanged} variant="outlined" size="small" disabled={this.state.operation === "edit"}></TextField></Grid>
                                    <Grid item>{this.state.errors.eventName ? <Typography variant="caption" color="error">{this.state.errors.eventName}</Typography> : ""} </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container direction="row" alignItems="center" spacing={2}>
                                    <Grid item><FormControl><label>Date:</label></FormControl></Grid>
                                    <Grid item>
                                        <TextField
                                            id="startDate"
                                            label="start"
                                            type="datetime-local"
                                            value={this.state.startDate.substring(0, 16)}
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
                                            value={this.state.endDate.substring(0, 16)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            size="small"
                                            onChange={this.handleEndDateChanged}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item > {this.state.errors.date ? <Typography variant="caption" color="error">{this.state.errors.date}</Typography> : ""}</Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <FormControl><label>Tickets:</label></FormControl>
                                <Box component="div" m={3} style={{ border: "1px solid grey", padding: "20px", borderRadius: "10px" }}>
                                    {this.state.tickets.map((ticket, index) => {
                                        return (
                                            <Grid container direction="row" spacing={2} key={index}>
                                                <Grid item>
                                                    <Grid container direction="row" spacing={2} alignItems="center">
                                                        <Grid item><FormControl ><label>Type:</label></FormControl></Grid>
                                                        <Grid item><TextField id="eventName" value={ticket.type} onChange={(event) => this.handleTypeChanged(event, index)} variant="outlined" size="small"></TextField></Grid>
                                                        <Grid item><FormControl ><label>Price:</label></FormControl></Grid>
                                                        <Grid item><TextField type="number" id="price" value={ticket.price} onChange={(event) => this.handleTicketPriceChanged(event, index)} variant="outlined" size="small"></TextField></Grid>
                                                        <Grid item><FormControl ><label>Count:</label></FormControl></Grid>
                                                        <Grid item><TextField type="number" id="maxCount" value={ticket.maxCount} onChange={(event) => this.handleTicketMaxCountChanged(event, index)} variant="outlined" size="small"></TextField></Grid>
                                                        <IconButton onClick={this.handleAddTicket}><AddCircleOutlineIcon /></IconButton>
                                                        <IconButton onClick={() => this.handleRemoveTicket(index)} disabled={this.state.tickets.length <= 1}><RemoveCircleOutlineIcon /></IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                </Box>
                            </Grid>
                            <Grid item>{this.state.errors.tickets ? <Typography variant="caption" color="error">{this.state.errors.tickets}</Typography> : ""}</Grid>
                        </Grid>

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
    queriedEventName: PropTypes.string,
    classNames: PropTypes.any,
    handleDataUpdate: PropTypes.func
}
const mapStateToProps = state => {
    return {
        queriedEventName: state.eventName
    };
};
export const EventManager = withStyles(themeStyles)((connect(mapStateToProps, null)(EventManagerNoWrap)));

