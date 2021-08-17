import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import axios from "axios";
import {connect } from 'react-redux';
import { Grid, Button, Typography, Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import styles from 'css/components/ticketManager.scss';
import classNames from "classnames/bind";
import {isEmpty} from "lodash";
import { withStyles } from '@material-ui/styles';
import image1 from "assets/images/image1.jpg";
import image2 from "assets/images/image2.jpg";
import image3 from "assets/images/image3.jpg";
import image4 from "assets/images/image4.jpg";
const themeStyles = () => ({
    flexGrow: {
        "&.MuiGrid-root": {
            flexGrow: "1"
          }
    }
})
var cx = classNames.bind(styles);
class TicketManagerNoWrap extends Component {
    constructor(props) {
        super(props);
        this.state={
            eventName: this.props.eventName || "",
            event: {},
        }
        this.randomImage =  Math.floor(Math.random() * 4) + 1;
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
            this.randomImage = Math.floor(Math.random() * 4) + 1;
        }).catch((error)=> {
            console.log(error);
        })
      }
  
    render() {
        return (
                <Fragment>
                    {
                    isEmpty(this.state.event) ? null : 
                    <Fragment>
                    <Grid container direction="column" spacing={2} className={cx("outerContainer")}>
                        <Grid item>
                            <img style={{height: "300px", width: "400px"}} src={((this.randomImage === 1 ? image1 : (this.randomImage === 2 ? image2 : (this.randomImage === 3 ? image3 : image4))))}/>
                        </Grid>
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
                        </Grid>
                        <Grid container spacing={3} className={cx("flexGrow")} style={{padding: "10px"}}>
                            {this.state.event.tickets.map((ticket, index) => {
                                return (
                                    <Grid item key={index}>
                                    <Card className={cx("ticketCard")}>
                                        <CardHeader title={ticket.type}/>
                                        <CardContent>
                                            <Typography>Price: {ticket.price}</Typography>
                                            <Typography >Available: {ticket.maxCount - ticket.sold}</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button>Buy!</Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>
                                );
                            })}
                         </Grid>
                        </Fragment>

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
//export const  TicketManager = connect(mapStateToProps, null)(TicketManagerNoWrap);
export const TicketManager = connect(mapStateToProps)(withStyles(themeStyles)(TicketManagerNoWrap));
{/* <Grid container direction="column" spacing={2} key={index}>
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
</Grid> */}