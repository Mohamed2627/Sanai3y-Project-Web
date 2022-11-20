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


// To add a job   {title: "", description: "", category: ""} of the job and token of the current client is required
// storage of the job image
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
// The route            The name of the input file must be "jobImage"
route.post("/postjob", upload.single("jobImage"), async (req, res) => {

    try {
        // console.log(req.file)
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });
        // console.log(req.body)
        // creating the job
        const jobs = await Job.create({ ...req.body })
        // Adding the name of the job image in the data base
        let pathLink = "http://localhost:7000/uploads/"
        // for (let image of req.files) {
        //   jobs.image.push(pathLink + image.originalname)
        jobs.image = pathLink + req.file.originalname
        // }
        // jobs.save();
        // Adding the clientId
        jobs.clientId = client._id;
        jobs.clientData = client;
        // Adding hiredDay
        let hiredDay = jobs.hiredDate.toISOString().slice(0, 10);
        jobs.hiredDay = hiredDay;
        jobs.save();
        client.jobs.push(jobs);
        client.save();
        res.status(200).json({ success: true, message: "job added", data: jobs })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error when creating the job" })
    }


    // Job.create({ ...req.body }, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error when creating the job" })
    //     }
    //     else {
    //         // Adding the name of the job image in the data base
    //         let pathLink = "http://localhost:7000/uploads/"
    //         // for (let image of req.files) {
    //         //   data.image.push(pathLink + image.originalname)
    //         data.image = pathLink + req.file.originalname
    //         // }
    //         // data.save();
    //         // Adding the clientId
    //         data.clientId = client._id;
    //         data.clientData = client;
    //         data.save();
    //         client.jobs.push(data);
    //         client.save();
    //         res.status(200).json({ success: true, message: "job added" })
    //     }
    // })
})


// Updating the job by the Client        id of the job and the token of the current client is required
route.put("/update/:id", async function (req, res) {

    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });
        if (client) {
            const jobs = await Job.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ success: true, message: "job updated successfully" });
        }
        else {
            res.status(401).json({ success: false, message: "token of the current client is required" });
        }
    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on updating this job" });
    }

    // if (client) {
    //     Job.findByIdAndUpdate(req.params.id, req.body, async function (err, data) {
    //         if (err) {
    //             console.log(err)
    //             res.status(401).json({ success: false, message: "error on updating this job" });
    //         }
    //         else {
    //             res.status(200).json({ success: true, message: "job updated successfully" });
    //         }
    //     })
    // }
    // else {
    //     res.status(401).json({ success: false, message: "token of the current client is required" });
    // }
})


// Delete the job by the client          id of the job and the token of the current client is required
route.delete("/delete/:id", async function (req, res) {

    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });
        if (client) {
            const jobs = await Job.findByIdAndDelete(req.params.id);
            res.status(200).json({ success: true, message: "job deleted successfully" });
        }
        else {
            res.status(401).json({ success: false, message: "token of the current client is required" });
        }

    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on deleting this job" });
    }

    // if (client) {
    //     Job.findByIdAndDelete(req.params.id, async function (err, data) {
    //         if (err) {
    //             console.log(err)
    //             res.status(401).json({ success: false, message: "error on deleting this job" });
    //         }
    //         else {
    //             res.status(200).json({ success: true, message: "job deleted successfully" });
    //         }
    //     })
    // }
    // else {
    //     res.status(401).json({ success: false, message: "token of the current client is required" });
    // }
})


// Adding the proposals     id of the job and the token of sanai3y is required
route.put("/addproposal/:id", async function (req, res) {

    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });

        // Adding the proposals
        const jobs = await Job.findByIdAndUpdate(req.params.id, { $push: { proposals: { sanai3yId: sanai3y, sanai3yProposal: req.body.sanai3yProposal } } });
        res.status(200).json({ success: true, message: "proposal added", data: jobs });
    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on adding proposal" });
    }

    // Job.findByIdAndUpdate(req.params.id, { $push: { proposals: { sanai3yId: sanai3y, sanai3yProposal: req.body.sanai3yProposal } } }, async (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on adding proposal" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "proposal added" });
    //     }
    // })

})

// Get the job by id                id of the job is required
route.get("/job/:id", async function (req, res) {

    try {
        const jobs = await Job.findById(req.params.id);
        res.status(200).json({ success: true, message: "You got the job by the required id", data: jobs });
    } catch (err) {
        // console.log(err)
        res.status(401).json({ success: false, message: "error on getting this job" });
    }

    // Job.findById(req.params.id, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on getting this job" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "You got the job by the required id", data: data });
    //     }
    // })

})

// Get all jobs
route.get("/all", async function (req, res) {

    try {
        const jobs = await Job.find({});
        res.status(200).json({ success: true, message: "You got all the jobs", data: jobs });
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting all the jobs" });
    }

    // Job.find({}, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on getting all the jobs" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "You got all the jobs", data: data });
    //     }
    // })
})


// Getting all jobs aggregated by day
route.get("/dates", async function (req, res) {

    try {

        const jobs = await Job.aggregate([
            //   {$match: {"proposals.sanai3yId": sanai3y._id}},
            { $group: { _id: "$hiredDay", totalJobs: { $sum: 1 } } },
            { $project: { date: "$_id", totalJobs: "$totalJobs", _id: 0 } },
            { $sort: { date: -1 } }
        ])
        res.status(200).json({ success: true, message: "You have all jobs aggregated by hired date", Data: jobs });

    } catch (err) {
        console.log(err);
        res.status(500).json({ sucsess: false, message: "There is error on getting all the proposals applied by this sanai3y", TheError: err.message });
    }

})



module.exports = route;
