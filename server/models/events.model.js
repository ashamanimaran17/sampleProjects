const mongoose = require("mongoose");
const Schema = mongoose.
Schema;
const eventSchema= new Schema({
    eventName: {type: String,required: true,unique: true,trim: true},
    tickets:[
        {type:{type: String,required: true,trim: true},
        price:{type:Number, required: true},
        maxCount:{type:Number, required: true},
        sold:{type:Number, required: true} }
    ],
    startDate:{type:Date, required: true},
    endDate:{type:Date, required: true}
}, {
    timestamps: true
})
const TicketEvent = mongoose.model('TicketEvent', eventSchema);
module.exports = TicketEvent;
