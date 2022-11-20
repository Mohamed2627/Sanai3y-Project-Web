// importing packages and modules
const express = require("express");
const path = require('path');
const cors = require("cors");

// importing the connection and routes
const connect = require("./config/connectonDb");
const sanai3y = require("./routes/sanai3y");
const client = require("./routes/client");
const job = require("./routes/jobs");
const conversation = require("./routes/conversation");
const message = require("./routes/message");
const notifications = require("./routes/notifications")

// Setting the port
const port = process.env.port || 7000;

// creating The server
const app = express();
const http = require("http").createServer(app)

// connecting to database
connect();

const io = require("socket.io")(http, { cors: { origin: "*" } })
// const io = require("socket.io")(http, {
//     cors: { 
//         origin: "http://localhost:7000",
//         methods: ["GET", "POST"] 
//     } 
//     })

// middleware
// app.set("views", "views")
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static("views"));

app.use(cors("*"));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Expose-Headers", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});


// Routes middleware
app.use("/sanai3y", sanai3y);
app.use("/client", client);
app.use("/jobs", job);
app.use("/messages", message);
app.use("/conversations", conversation)
app.use("/notifications", notifications)


// The socket
let users = [];
// let clients= [];
// let sanai3ies =[];

// A function to add the the current online userId with its current socketId
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && (userId !== null) && users.push({ userId, socketId });
}

// A function to remove online user on disconnecting
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

// A function to get the recieverId
const getRecieverId = (recieverId) => {
    return users.find((user) => user.userId === recieverId);
}

io.on('connection', function (socket) {
    try {
        console.log('a user connected with socket Id: ' + socket.id);
        console.log(socket.rooms);
        // On adding online user when connecting
        socket.on("addUser", (userId) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });

        // Sending and recieving messages
        socket.on("sendMessage", ({ senderId, recieverId, text }) => {
            const reciever = getRecieverId(recieverId)
            // io.to(reciever?.socketId).emit("recieveMessage", { senderId, text })
            io.to(reciever?.socketId).emit("recieveMessage", { senderId, text })
        })


        // The notifications
        // grouping the users to clients and sanai3ies
        socket.on("groupUserRule", ({ currentUserId, currentUserRule }) => {
            if (currentUserRule == "sanai3y") {
                socket.join("sanai3ies")
                // console.log(currentUserRule)

                // io.to("sanai3ies").emit("getRule", "you are sanai3y")
            }
            else if (currentUserRule == "client") {
                socket.join("clients")
                // console.log(currentUserRule)
                // io.to("clients").emit("getRule", "you are client")
            }
            // console.log(currentUserRule)

        })
        // On adding job
        socket.on("addJob", (data) => {
        // socket.on("addJob", (jobId) => {
            // console.log(jobId)
            io.to("sanai3ies").emit("getJob", data)
            // io.to("sanai3ies").emit("getJob", jobId)

        })

        // On accepting job
        socket.on("acceptJob", (data) => {
            const reciever = getRecieverId(data.sanai3yId)
            console.log(data.sanai3yId)
            console.log(reciever)
            // io.to(reciever?.socketId).emit("recieveMessage", { senderId, text })
            io.to(reciever?.socketId).emit("getAcceptedJob", data)
        })

        // on adding proposal
        socket.on("addproposal", (data) => {
            const reciever = getRecieverId(data.clientId)
            console.log(data)
            console.log(reciever)
            io.to(reciever?.socketId).emit("getproposal", data);
        })

        // On confirming job
        socket.on("confirmjob", (data) => {
            const reciever = getRecieverId(data.clientId)
            console.log(data)
            console.log(reciever)
            io.to(reciever?.socketId).emit("getconfirm", data);
        })


        // Removing online user on disconnecting
        socket.on("disconnect", () => {
            console.log("user disconnected with socket Id: " + socket.id)
            console.log(socket.rooms)
            removeUser(socket?.id);
            io.emit("getUsers", users);
        })



    } catch (err) {
        console.log(err)
    }




});








http.listen(port, function () {
    console.log(`The server is listening on port ${port}`);
})