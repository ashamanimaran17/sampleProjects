var express = require('express');
var app = express();
const path = require("path");
var appRoot = process.env.PWD;
//non react
/* app.get("/", (req, res) => {
 res.sendFile(path.join(appRoot, "index.html"));
}); */
//react
app.use(express.static(path.join(appRoot, "dist")));

//server will be sending and receiving json
app.use(express.json());

app.listen(3000, ()=> {
    console.log("server started at 3000 and updating with concurrantly");
})