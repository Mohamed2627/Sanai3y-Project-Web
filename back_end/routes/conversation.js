// import Router function 
const route = require("express").Router();

// import Jsonwebtoken
const jwt = require("jsonwebtoken");

// import multer
const multer = require('multer');

// import models
const Job = require('../models/Jobs')
const Client = require("../models/Client")
const Sanai3y = require("../models/sanai3y")
const Conversation = require("../models/Conversation")


// Add new conversation    { senderId: "", recieverId: ""} is required
route.post("/", function(req, res) {
    // console.log(req.body)
    // console.log("hgvutcu");
    Conversation.create({members: [req.body.senderId, req.body.recieverId]}).then((data)=> {
        // console.log(data);
        res.status(200).json({success: true, message: "Conversation has been stored", data: data});
    }).catch((err)=> {
        // console.log(err);
        res.status(500).json({success: false, message: err.message})
    })
})


// Get all conversations of the user by the userId .........userId is required
route.get("/:userId", async function(req, res) {
    // Conversation.find({members: {$in: [req.params.userId]}}).then((data)=> {

    Conversation.find({members: req.params.userId}).then((data)=> {
        // console.log(data);
        res.status(200).json({success: true, message: "You got all conversations of this user", data: data});
    }).catch((err)=> {
        // console.log(err);
        res.status(500).json({success: false, message: err.message})
    })
})




module.exports = route;
