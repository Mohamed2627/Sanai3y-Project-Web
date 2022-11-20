const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
    members: {
        type: Array
    }
    
}, {
    versionKey:false,
    strict:false,
    timestamps: true
});

module.exports = mongoose.model("Conversation", conversationSchema);