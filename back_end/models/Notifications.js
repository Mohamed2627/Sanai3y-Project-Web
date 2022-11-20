const mongoose = require("mongoose");

const notificationsSchema = mongoose.Schema({
    addJob: [{
        type: String
    }],
    addProposal: [{
        type: String
    }],
    acceptJob: [{
        type: String
    }]
}, {
    versionKey:false,
    strict:false,
    timestamps: true 
});

module.exports = mongoose.model("Notifications", notificationsSchema);