const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
    img: {
        type: String
    }
    
}, {
    versionKey:false,
    strict:false,
    timestamps: true 
});

module.exports = mongoose.model("Message", messageSchema);