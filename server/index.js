const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const dbConnect = require('./config/dbConnect');
const cloudinaryConnect = require('./config/cloudinaryConnect');

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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("server working");
});

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
    methods: ["GET", "POST"],
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
