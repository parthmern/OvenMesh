const express = require('express');
const dbConnect = require('./config/dbConnect');
const cloudinaryConnect = require('./config/cloudinaryConnect');

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
cloudinaryConnect();

//=================================
// 💙Middlewares -------------------------------------------------
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
app.use(cors());
const fileUpload = require("express-fileupload");
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)


//=============
const userRoute = require("./routes/userRoute");
const menuRoute = require("./routes/menuRoute");
const orderRoute = require("./routes/orderRoute");

app.use("/user", userRoute);
app.use("/menu", menuRoute);
app.use("/order", orderRoute);

