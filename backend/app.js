const express = require("express");
const app = express();

app.use("/", (req, res) =>{
    res.send("hello frome backend side");
});

const port = 5000;

app.listen(port, ()=>{
    console.log("server started")
});
