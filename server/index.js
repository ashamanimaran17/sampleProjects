var express = require('express');
var app = express();
const mongoose = require("mongoose");

require("dotenv").config();
const path = require("path");
var appRoot = process.env.PWD;

const port= 
process.env.PORT || 3000;
const uri= process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection= mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB connection established");
})
//non react
/* app.get("/", (req, res) => {
 res.sendFile(path.join(appRoot, "index.html"));
}); */
//react
app.use(express.static(path.join(appRoot, "dist")));
app.use(express.static('public'))

//server will be sending and receiving json
app.use(express.json());

const eventsRouter = require("./routes/events");
app.use('/events', eventsRouter);

app.listen(3000, ()=> {
    console.log(`server started at ${port}`);
})