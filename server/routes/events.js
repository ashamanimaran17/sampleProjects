var express = require('express');
var router = express.Router();
let TicketEvent = require("../models/events.model");
router.route('/').get((req, res)=> {
    TicketEvent.find()
    .then((ticketEvents) => {res.json(ticketEvents)})
    .catch((err)=> {res.status(400).json('Error' + err)});
})
router.route('/add').post((req, res)=> {
   /*  const event = req.body.event;
    const ticket = req.body.ticket;
    const date = req.body.date;
    const price = req.body.price;
    const newTicketEvent = new TicketEvent({
        "event": event,
        "ticket": ticket,
        "date": date,
        "price": price
    }); */
    const newTicketEvent = new TicketEvent(req.body);
    newTicketEvent.save()
    .then(( )=> {
    res.json('Event added')}
    ).catch((err)=> {
        res.status(400).json('Error' + err)
    });
})
module.exports = router;