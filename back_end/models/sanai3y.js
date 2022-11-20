const mongoose = require("mongoose");

const sanai3ySchema = mongoose.Schema({
    nationalId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(val) {
                return val.length === 14;
            },
            message: "Not valid national Id"
        }
    },
    notifications: [{
        type: Object
    }],
    newNotifications: [{
        type: Object

    }],
    workStore: [{
        img: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        }
    }],
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
    jobcount: {
        type: Number
    },
    subcribe: {
        type: Boolean,
        default: false
    },
    rule: {
        type: String,
        default: "sanai3y"
    },
    img: {
        type: String,
        default: "http://localhost:7000/uploads/user.png"
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
    // profile image
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(val) {
                return val.length === 11;
            },
            message: "Invalid phone number"
        }

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
    description: {
        type: String,
    },
    gender: {
        type: String,
        enum: {
            values: ['ذكر', 'انثى'],
            message: "You entered not valid value"
        }
    },
    address: {
        type: String,
    },
    skills: {
        type: String,
        required: true 
    },
    token: {
        type: String,
    },
    evaluation: [{
        clientId: {
            type: mongoose.Types.ObjectId,
            ref: "Client",
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
    }],
    level: {
        type: String,
        default: "freetrail",
        enum: {
            values: ['freetrail', 'pending', "subscriber"],
        }
    },
    newMessage: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "free",
        enum: {
            values: ['free', 'busy'],
        }
    }

}, {
    versionKey:false,
    strict:false,
})

module.exports = mongoose.model("Sanai3y", sanai3ySchema);