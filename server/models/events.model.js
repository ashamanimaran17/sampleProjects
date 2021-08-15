const mongoose = require("mongoose");
const Schema = mongoose.
Schema;
const eventSchema= new Schema({
    event: {type: String,required: true,unique: true,trim: true,minlength:3},
    ticket:{type: String,required: true,trim: true,minlength:3},
    date:{type:Date, required: true},
    price:{type:Number, required: true}
}, {
    timestamps: true
})
const TicketEvent = mongoose.model('TicketEvent', eventSchema);
module.exports = TicketEvent;
