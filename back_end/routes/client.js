// import Router function 
const route = require("express").Router();

// import Jsonwebtoken
const jwt = require("jsonwebtoken");

// import multer
const multer = require('multer');

// import client model
const Client = require("../models/Client");

// import Sanai3y model
const Sanai3y = require("../models/sanai3y");

// import Job model
const Job = require('../models/Jobs')

// import bcrypt
const bcrypt = require('bcrypt');
const { json } = require("body-parser");

// signup            The data is required as the same names as the client model
route.post("/signup", async function (req, res) {
    try {
        const body = req.body;
        const isClientFound = await Client.findOne({ email: body.email });
        if (isClientFound) {
            res.send("You already have acount, You can signin")
        }
        else {
            const cryptedPassword = await bcrypt.hash(body.password, 10);
            const client = await Client.create({ ...body, password: cryptedPassword });
            // console.log(client)
            const token = jwt.sign({ clientId: client._id, email: client.email }, "secret_key");
            client.token = token;
            client.save();
            // res.setHeader("authorization", token);
            res.send("data stord and signup successfully");
        }

    } catch (err) {
        // console.log(err);
        res.status(500).send("data not valid");
    }

    // if (isClientFound) {
    //     res.send("You already have acount, You can signin")
    // }
    // else {
    //     const cryptedPassword = await bcrypt.hash(body.password, 10);

    //     Client.create({ ...body, password: cryptedPassword }, async function (err, data) {
    //         if (err) {
    //             res.status(401).send("data not valid")
    //         }
    //         else {
    //             console.log(data)
    //             const token = jwt.sign({ clientId: data._id, email: data.email }, "secret_key");
    //             data.token = token;
    //             data.save();
    //             // res.setHeader("authorization", token);
    //             res.send("data stord and signup successfully");

    //         }
    //     })
    // }

})

// Getting the data of the user ........ token is required
route.get("/user", async function (req, res) {
    try {
        // get the current user with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });
        // console.log(client);
        const sanai3y = await Sanai3y.findOne({ token: currentToken });
        if (client) {
            res.status(200).json({ sucsess: true, message: "You got the data of this user", data: client });
        }
        else if (sanai3y) {
            res.status(200).json({ sucsess: true, message: "You got the data of this user", data: sanai3y });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on getting this user", TheError: err.message });
    }
})


// Getting the data of the user ........ id is required
route.get("/users/:userId", async function (req, res) {
    try {
        // get the current user with the help of id

        const client = await Client.findById(req.params.userId);
        // console.log(client);
        const sanai3y = await Sanai3y.findById(req.params.userId);
        if (client) {
            res.status(200).json({ sucsess: true, message: "You got the data of this user", data: client });
        }
        else if (sanai3y) {
            res.status(200).json({ sucsess: true, message: "You got the data of this user", data: sanai3y });
        }
    } catch (err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on getting this user", TheError: err.message });
    }
})

// signin            This is the signin of sanai3y and client
route.post("/signin", async function (req, res) {

    try {
        const body = req.body;
        const client = await Client.findOne({ email: body.email })
        const sanai3y = await Sanai3y.findOne({ email: body.email })
        if (client) {
            const isValidPassword = await bcrypt.compare(body.password, client.password);
            if (isValidPassword) {
                res.setHeader("authorization", client.token);
                res.status(200).json({ sucsess: true, message: "Valid password & logged in", data: client });
            }
            else {
                res.status(401).json({ sucsess: false, message: "invalid Password & can not login" });
            }
        }
        else if (sanai3y) {
            const isValidPassword = await bcrypt.compare(body.password, sanai3y.password);
            if (isValidPassword) {
                res.setHeader("authorization", sanai3y.token);
                res.status(200).json({ sucsess: true, message: "Valid password & logged in", data: sanai3y });
            }
            else {
                res.status(401).json({ sucsess: false, message: "invalid Password & can not login" });
            }
        }
        else {
            res.status(401).json({ sucsess: false, message: "This account is not found" });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on logging this user", TheError: err.message });
    }


    // if (client) {
    //     const isValidPassword = await bcrypt.compare(body.password, client.password);
    //     if (isValidPassword) {
    //         res.setHeader("authorization", client.token);
    //         res.status(200).json({ sucsess: true, message: "Valid password & logged in", data: client });
    //     }
    //     else {
    //         res.status(401).json({ sucsess: false, message: "invalid Password & can not login" });
    //     }
    // }
    // else if (sanai3y) {
    //     const isValidPassword = await bcrypt.compare(body.password, sanai3y.password);
    //     if (isValidPassword) {
    //         res.setHeader("authorization", sanai3y.token);
    //         res.status(200).json({ sucsess: true, message: "Valid password & logged in", data: sanai3y });
    //     }
    //     else {
    //         res.status(401).json({ sucsess: false, message: "invalid Password & can not login" });
    //     }
    // }
    // else {
    //     res.status(401).json({ sucsess: false, message: "This account is not found" });
    // }

})


// Update the profile of client
route.put("/updateprofile", async function (req, res) {
    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOneAndUpdate({ token: currentToken }, {...req.body});
        res.status(200).json({ success: true, message: "The profile updated successfully"});

        // 
    }catch (err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on updating this profile", theError: err.message });
    }
})


// When client confirm compeleting the job   >>>>> {sanai3yId: ""}  body
route.put("/confirmjob", async (req, res) => {
    try {
        const sanai3y = await Sanai3y.findById(req.body.sanai3yId);
        sanai3y.status = "free";
        sanai3y.save();
        res.status(200).json({ success: true, message: "Job compelete confirmed and the status of sanai3y changed to free"});

    }catch (err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on confirming compeleting this job and changing the status of sanai3y", theError: err.message });
    }
})

// when changing the password   >>>>>>  {currentPassword: "", newPassword: ""} and the token of the client is required
route.put("/changepassword", async (req, res) => {
    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });
        // checking the current password
        const isValidPassword = await bcrypt.compare(req.body.currentPassword, client.password);
        if (isValidPassword) {

            const newCryptedPassword = await bcrypt.hash(req.body.newPassword, 10);
            client.password = newCryptedPassword;
            client.save();

            res.status(200).json({ sucsess: true, message: "Your password has been changed" });
        }
        else {
            res.status(401).json({ sucsess: false, message: "You entered wrong current password" });
        }

    }catch(err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on changing the password of this client", theError: err.message });
    }
})

// Adding images       The name of input file must be "clientImage"

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname);
    }
})

const multerFilter = function (req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        cb(null, true)
    }
    else {
        cb(new Error("Not image"), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})
// the route
route.post("/addimage", upload.single("clientImage"), async (req, res) => {

    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });
        let pathLink = "http://localhost:7000/uploads/"
            // the name of the image in the data base
            client.img = pathLink + req.file.originalname;
            client.save();
            res.status(200).json({
                success: true,
                message: "Image uploaded successfully",
            })

    }catch(err) {
        console.log(err)
            res.status(401).json({
                success: false,
                message: "Error when uploading the image",
            })
    }
    

    // Client.findById(client._id, function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({
    //             success: false,
    //             message: "Error when uploading the image",
    //         })
    //     }
    //     else {
    //         let pathLink = "http://localhost:7000/uploads/"
    //         // the name of the image in the data base
    //         data.img = pathLink + req.file.originalname;
    //         data.save();
    //         res.status(200).json({
    //             success: true,
    //             message: "Image uploaded successfully",
    //         })
    //     }
    // })
});

// Add client evaluation      The token of the current sanai3y and id of client is required and object of {rate: "", comment: ""} as body of request
route.put("/evaluation/:id", async function (req, res) {

    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });
        // Adding evaluation
        const client = await Client.findByIdAndUpdate(req.params.id, { $push: { evaluation: { sanai3yId: sanai3y._id, rate: req.body.rate, comment: req.body.comment } } });
        res.status(200).json({ success: true, message: "evaluation added to the client" });
    }catch(err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on adding evaluation for the client" });
    }
    

    // Adding evaluation
    // Client.findByIdAndUpdate(req.params.id, { $push: { evaluation: { sanai3yId: sanai3y._id, rate: req.body.rate, comment: req.body.comment } } }, async (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on adding evaluation for the client" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "evaluation added to the client" });
    //     }
    // })
})

// delete client by admin       id of the client is required
route.delete("/delete/:id", async function (req, res) {

    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "client account has been deleted" });
    }catch(err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on deleting this client acount" });
    }

    // Client.findByIdAndDelete(req.params.id, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(400).json({ success: false, message: "error on deleting this client acount" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "client account has been deleted" });
    //     }
    // })
})

// Getting all clients
route.get("/all", async function (req, res) {

    try {
        const client = await Client.find({});
        res.status(200).json({ success: true, message: "You have got all clients", Data: client });
    }catch(err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on getting all clients" });
    }

    // Client.find({}, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on getting all clients" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "You have got all clients", Data: data });
    //     }
    // })
})


// Getting client by id        id of client is required
route.get("/clients/:id", async function (req, res) {

    try {
        const client = await Client.findById(req.params.id).populate("jobs");
        res.status(200).json({ success: true, message: "You have got client by the required id", Data: client });
    }catch(err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on getting this client by id" });
    }

    // Client.findById(req.params.id, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on getting this client by id" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "You have got client by the required id", Data: data });
    //     }
    // }).populate("jobs")
})


// Getting the jobs that posted by this client    token of this client is required
route.get("/jobs", async function (req, res) {

    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });
        const jobs = await Job.find({ clientId: client._id });
        res.status(200).json({ success: true, message: "You have all jobs posted by this client", Data: jobs });
    }catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting jobs posted by this client" });
    }

    // Job.find({ clientId: client._id }, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on getting jobs posted by this client" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "You have all jobs posted by this client", Data: data });
    //     }
    // })
})


// The add proposal notification to the corresponding client
route.put("/addproposalnotification", async (req, res) => {
    try {
        let client = await Client.findById (req.body.clientId);

        client.newNotifications.unshift(req.body);
        client.save();

        res.status(200).json({ success: true, message: "This notification has been added to the corresponding client", data: req.body });


    }catch (err) {
        // console.log(err);
        res.status(500).json({ sucsess: false, message: "There is error on adding this notifications to this client", TheError: err.message });
    }
})


// The add confirm compelete notification to the corresponding client
route.put("/confirmcompelete", async (req, res) => {
    try {
        let client = await Client.findById (req.body.clientId);

        client.newNotifications.unshift(req.body);
        client.save();

        res.status(200).json({ success: true, message: "This notification has been added to the corresponding client", data: req.body });


    }catch (err) {
        // console.log(err);
        res.status(500).json({ sucsess: false, message: "There is error on adding this notifications to this client", TheError: err.message });
    }
})


// when reading the notifications    >>>>>> token of the current client is required
route.put("/readnotification", async (req, res) => {
    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        // console.log(currentToken)
        const client = await Client.findOne({ token: currentToken });
        // console.log(sanai3y)

        if (client.newNotifications.length != 0) {
            client.notifications = [...client.newNotifications, ...client.notifications ]
            client.newNotifications = [];
            client.save();
        }
        

        res.status(200).json({ success: true, message: "The new notifications have been added to the old notifications" });


    }catch (err) {
        // console.log(err);
        res.status(500).json({ success: false, message: "There is error on adding new notifications to this clinet", TheError: err.message });
    }
})


// Getting all notifications of specfic client  >>>>> token of client is required
route.get("/notifications", async (req, res) => {
    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });

        res.status(200).json({ success: true, message: "You have got all the notifications of this client", data: {newNotifications: client.newNotifications, oldNotifications: client.notifications} });


    }catch (err) {
        // console.log(err);
        res.status(500).json({ sucsess: false, message: "There is error on getting the notifications of this client", TheError: err.message });
    }
})


module.exports = route;
