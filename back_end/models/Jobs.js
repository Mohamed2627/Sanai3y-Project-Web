const mongoose = require("mongoose");
// import client model
const Client = require("../models/Client");

const jobsSchema = mongoose.Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: "Client"
    },
    clientData: {
        type: Object
    },
    sanai3yId: {
        type: mongoose.Types.ObjectId,
        ref: "Sanai3y"
    },
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    hiredDate: {
        type: Date,
        default: Date.now
    },
    hiredDay: {
        type: String,
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["compelete", "in progress", "pending"]
            // message: "You entered not valid value"
        },
        default: "pending"
    },
    proposals: [{
        sanai3yId: {
            type: Object,
        },
        sanai3yProposal: {
            type: String
        }
    }]
}, 
{
    versionKey:false,
    strict:false,
})
//export jobs
module.exports = mongoose.model("Jobs", jobsSchema);