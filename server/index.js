

const express = require('express');
const dbConnect = require('./config/dbConnect');
const cloudinaryConnect = require('./config/cloudinaryConnect');



const app = express();


require("dotenv").config();


// ===============================================

// Socket IO
const { Server } = require("socket.io");
let http = require('http').Server(app);
const {createServer} = require(http);
const server = createServer(app);

const io = new Server(server,  {
    cors : {
        origin : "*",
        methods :["GET", "POST"],
        credentials : true,
    }
});

io.on('connection', (socket) => {
    console.log('✨🔌in server, a user connected with', socket.id);

    socket.on("userJoinedWithOrderId", (data)=>{
        console.log("in server, order id userJoinedWithOrderId event", data);
        socket.join(data);
    });

    //socket.join('room1');


    socket.on("adminJoined", (data)=>{
        console.log(" ❤ 🧡 💛 💚 💙 💜  Admin joined->", data);
        socket.join(data);
    })

});

module.exports = io;


// ===============================================


const PORT = process.env.PORT || 5000 ; 

server.listen(PORT, ()=>{
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
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
app.use(cors({
    origin: '*',
    credentials: true,
}));
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
const adminRoute = require("./routes/adminRoute");


app.use("/user", userRoute);
app.use("/menu", menuRoute);
app.use("/order", orderRoute);
app.use("/admin", adminRoute);
