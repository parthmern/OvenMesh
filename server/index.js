const express = require('express');
const dbConnect = require('./config/dbConnect');


const app = express();


require("dotenv").config();

const PORT = process.env.PORT || 5000 ; 

app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})

app.get("/", (req, res)=>{
    res.send("server working");
})

//=================================


dbConnect();



