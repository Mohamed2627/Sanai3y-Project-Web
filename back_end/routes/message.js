// import Router function 
const route = require("express").Router();

// import Jsonwebtoken
// const jwt = require("jsonwebtoken");

// import multer
const multer = require('multer');

// import models
// const Job = require('../models/Jobs')
const Client = require("../models/Client")
const Sanai3y = require("../models/sanai3y")
const Message = require("../models/Message")
const Conversation = require("../models/Conversation")

// The multer to add image 

// storage and filename
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname);
    }
})
// The filteration
const multerFilter = function (req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        cb(null, true)
    }
    else {
        cb(new Error("Not image"), false)
    }
}
// The middleware
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

// When writing a new message ..........{conversationId: "Id", sender: "SenderId", text: ""} is required
route.post("/", async function(req, res) {
    try {
        const message = await Message.create(req.body);
        const conversation = await Conversation.findById(req.body.conversationId);
        let recieverId = conversation.members.find((id) => id != req.body.sender);
        let sanai3y = await Sanai3y.findById(recieverId);
        let client = await Client.findById(recieverId)

        if (sanai3y) {
            sanai3y.newMessage = true;
            sanai3y.save();
        }
        else if (client) {
            client.newMessage = true;
            client.save();
        }

        res.status(200).json({success: true, message: "You sent a new message", data: message});
    }
    catch(err)  {
        // console.log(err);
        res.status(500).json({success: false, message: err.message})
    }
    // Message.create(req.body).then((data)=> {
    //     // console.log(data);
    //     // console.log("sssssssss");
    //     res.status(200).json({success: true, message: "You sent a new message", data: data});
    // }).catch((err)=> {
    //     // console.log(err);
    //     res.status(500).json({success: false, message: err.message})
    // })
})


// Get all messages of specified conversation.........ConversationId is required
route.get("/:conversationId", function(req, res) {
    Message.find({conversationId: req.params.conversationId}).then((data)=> {
        // console.log(data);
        res.status(200).json({success: true, message: "You got all messages of this coversation", data: data});
    }).catch((err)=> {
        // console.log(err);
        res.status(500).json({success: false, message: err.message})
    })
})



module.exports = route;
