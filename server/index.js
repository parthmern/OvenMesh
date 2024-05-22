const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const dbConnect = require('./config/dbConnect');
const cloudinaryConnect = require('./config/cloudinaryConnect');

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: false,
    }
});

// //solving CORS issue
// const cors = require('cors'); // Import the cors module
// // Enable CORS for all routes
// app.use(cors());

io.on('connection', (socket) => {
    console.log('✨🔌in server, a user connected with', socket.id);

    socket.on("userJoinedWithOrderId", (data) => {
        console.log("in server, order id userJoinedWithOrderId event", data);
        socket.join(data);
    });

    socket.on("adminJoined", (data) => {
        console.log(" ❤ 🧡 💛 💚 💙 💜  Admin joined->", data);
        socket.join(data);
    });
});

module.exports = io;

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});




// ================= DEPLOYMENT -PRODUCTION START
const path = require("path");

const __dirname1 = path.resolve(__dirname, '..');
if(process.env.NODE_ENV == "production"){
    console.log(__dirname1);
    console.log(__dirname1, "/client/build");
    app.use(express.static(path.join(__dirname1, "/client/build")))

    app.get("/", (req, res)=>{
        res.sendFile(path.resolve(__dirname1,"client","build","index.html"));
    })
}
else{
    app.get("/", (req, res) => {
        res.send("server working without production");
    });
}


// ================= DEPLOYMENT -PRODUCTION END


//=================================
// 💙Middlewares -------------------------------------------------
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
const corsOptions = {
    origin: '*',
   
    allowedHeaders: ["Content-Type", "Authorization", "withCredentials"], // Include withCredentials in allowedHeaders
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


app.use(cors(corsOptions));

const fileUpload = require("express-fileupload");
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

//=============
const userRoute = require("./routes/userRoute");
const menuRoute = require("./routes/menuRoute");
const orderRoute = require("./routes/orderRoute");
const adminRoute = require("./routes/adminRoute");

app.use("/user", userRoute);
app.use("/menu", menuRoute);
app.use("/order", orderRoute);
app.use("/admin", adminRoute);

//=================================
dbConnect();
cloudinaryConnect();
