var express = require('express');
var router = express.Router();
let TicketEvent = require("../models/events.model");
router.route('/get').get((req, res)=> {
    TicketEvent.find()
    .then((ticketEvents) => {res.json(ticketEvents)})
    .catch((err)=> {res.status(400).json('Error' + err)});
})
router.route('/getEvent').get((req, res)=> {
    let eventName = req.query.eventName;
    TicketEvent.findOne({"eventName": eventName})
    .then((ticketEvents) => {
        res.json(ticketEvents)
    }).catch((err)=> {
        res.status(400).json('Error' + err)
    });
})

router.route('/add').post((req, res)=> {
    //const newTicketEvent = new TicketEvent(req.body);
    TicketEvent.findOneAndUpdate({'eventName': req.body.eventName}, req.body, {upsert: true})
    .then(( )=> {
    res.json('Event added')}
    ).catch((err)=> {
        res.status(400).json('Error' + err)
    });
})
module.exports = router;
//    newTicketEvent.save()