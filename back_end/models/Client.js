const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({

    nationalId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(val) {
                return val.length === 14;
            },
            message: "Not valid nationalId"
        }
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: "Email address is required",
        validate:{
            validator: function(val) {
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return pattern.test(val);
            },
            message: "Please fill a valid email address"
        }
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "http://localhost:7000/uploads/user.png"
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(val) {
                return val.length === 11;
            },
            message: "Phone number is not valid"
        }

    },
    token: {
        type:String
    },
    age: {
        type: Number,
        min: 15,
        max: 70
    },
    joinedDate: {
        type: Date,
        default: Date.now,
    },
    gender: {
        type: String,
        enum: {
            values: ['ذكر', 'انثى'],
            message: "You entered not valid value"
        }
    },
    rule: {
        type: String,
        default: "client",
        enum: {
            values: ['client', "admin"],
            message: "Invalid privilege"
        }
    },
    newMessage: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
    },
    notifications: [{
        type: Object
    }],
    newNotifications: [{
        type: Object

    }],
    evaluation: [{
        sanai3yId: {
            type: mongoose.Types.ObjectId,
            ref: "Sanai3y",
        },
        rate: {
            type: Number,
            min: 1,
            max: 5,
        },
        comment: {
            type: String
        }
    }],
    jobs: [{
        type: mongoose.Types.ObjectId,
        ref: "Jobs",
    }]
}, {
    versionKey:false,
    strict:false,
})

module.exports = mongoose.model("Client", clientSchema);