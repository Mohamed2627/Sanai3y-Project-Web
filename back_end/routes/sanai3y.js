// import Router function 
const route = require("express").Router();

// import Jsonwebtoken
const jwt = require("jsonwebtoken");

// import multer
const multer = require('multer');

// import bcrypt
const bcrypt = require('bcrypt');
const { json } = require("body-parser");

// import client model
const Client = require("../models/Client");

// import Sanai3y model
const Sanai3y = require("../models/sanai3y");

// import Job model
const Job = require("../models/Jobs");
const sanai3y = require("../models/sanai3y");


// signup                The data is required as the same names in the model
route.post("/signup", async function (req, res) {

    try {
        const body = req.body;
        const isSanai3yFound = await Sanai3y.findOne({ email: body.email })
        if (isSanai3yFound) {
            res.json({ sucsess: false, message: "You already have account" });
        }
        else {
            const cryptedPassword = await bcrypt.hash(body.password, 10);

            const sanai3y = await Sanai3y.create({ ...body, password: cryptedPassword, jobcount: 5 });

            console.log(sanai3y)
            const token = jwt.sign({ sanai3yId: sanai3y._id, email: sanai3y.email }, "secret_key");
            sanai3y.token = token;
            sanai3y.save();
            res.status(200).json({ sucsess: true, message: "data stord and signup successfully" });
        }

    } catch (err) {
        // console.log(err.message);
        res.status(500).json({ sucsess: false, message: "There is error on signingup this account", theError: err.message });
    }
})

// // signin         Like client signin>>>> handeled in client route
// route.post("/signin", async function (req, res) {

//   if (!(req.headers.authorization)) {
//     const body = req.body;
//     const sanai3y = await Sanai3y.findOne({ email: body.email })

//     if (sanai3y) {
//       const isValidPassword = await bcrypt.compare(body.password, sanai3y.password);
//       if (isValidPassword) {
//         const token = jwt.sign({ sanai3yId: sanai3y._id, email: sanai3y.email }, "secret_key");
//         sanai3y.token = token;
//         sanai3y.save();
//         res.setHeader("authorization", token);
//         res.status(200).send("valid password");
//       }
//       else {
//         res.status(401).send({ error: "invalid Password" });
//       }
//     }
//     else {
//       res.status(401).json({ error: "sanai3y is not found" });
//     }

//   }
//   else {
//     const body = req.body;
//     const sanai3y = await Sanai3y.findOne({ email: body.email })
//     const decryptedSanai3y = jwt.verify(req.headers.authorization, "secret_key");
//     console.log(decryptedSanai3y)
//     if (decryptedSanai3y.email == sanai3y.email) {
//       res.status(200).json({ sucsess: true, message: "loggedin" });
//     }
//     else {
//       res.status(401).json({ sucsess: false, message: "can not login" });
//     }
//   }
// })


// Adding images    The name of the image file must be "sanai3yImage"
// storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname);
    }
})
// filtration to only images
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

// The image route   To add the image of the profile
route.post("/addimage", upload.single("sanai3yImage"), async (req, res) => {

    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });
        let pathLink = "http://localhost:7000/uploads/"
        // the name of the image in the data base
        sanai3y.img = pathLink + req.file.originalname;
        sanai3y.save();
        res.status(200).json({
            status: "success",
            message: "File Uploaded successfully",
        })

    } catch (err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on uploading this image", theError: err.message });
    }
    // Sanai3y.findById(sanai3y._id, function (err, data) {
    //     if (err) {
    //         res.json(err);
    //     }
    //     else {
    //         let pathLink = "http://localhost:7000/uploads/"
    //         // the name of the image in the data base
    //         data.img = pathLink + req.file.originalname;
    //         data.save();
    //         res.status(200).json({
    //             status: "success",
    //             message: "File Uploaded successfully",
    //         })
    //     }
    // })
});


// When sanai3y delete store    >>>> token of the sanai3y is required
route.delete("/deletestore/:id", async function (req, res) {
    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });

        let newStore = sanai3y.workStore.filter((store) => store._id != req.params.id)
        sanai3y.workStore = newStore;
        sanai3y.save();
    
        res.status(200).json({ success: true, message: "The store deleted successfully"});

    }catch (err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on deleting this store"});
    }
})

// Update the profile of sanai3y
route.put("/updateprofile", async function (req, res) {
    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOneAndUpdate({ token: currentToken }, {...req.body});
        res.status(200).json({ success: true, message: "The profile updated successfully"});

        // 
    }catch (err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on updating this profile", theError: err.message });
    }
})


// when changing the password   >>>>>>  {currentPassword: "", newPassword: ""} and the token of the sanai3y is required
route.put("/changepassword", async (req, res) => {
    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });
        // checking the current password
        const isValidPassword = await bcrypt.compare(req.body.currentPassword, sanai3y.password);
        if (isValidPassword) {

            const newCryptedPassword = await bcrypt.hash(req.body.newPassword, 10);
            sanai3y.password = newCryptedPassword;
            sanai3y.save();

            res.status(200).json({ sucsess: true, message: "Your password has been changed" });
        }
        else {
            res.status(401).json({ sucsess: false, message: "You entered wrong current password" });
        }

    }catch(err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on changing the password of this sanai3y", theError: err.message });
    }
})


// Update the status of this sanai3y
route.put("/update", async function (req, res) {
    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3yByToken = await Sanai3y.findOne({ token: currentToken });
        const sanai3y = await Sanai3y.findById(sanai3yByToken._id);
        sanai3y.subcribe = true;
        sanai3y.jobcount = 100;
        sanai3y.save();
        res.send("ok is updated")

    }catch (err) {
        // console.log(err)
        res.status(500).json({ sucsess: false, message: "There is error on updating this sanai3y", theError: err.message });
    }
})

// To add work to the profile of Sanai3y..........token of sanai3y and {title: "", description: ""} is required.
route.post("/addwork", upload.single("workImage"), async (req, res) => {
    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3yByToken = await Sanai3y.findOne({ token: currentToken });
        const sanai3y = await Sanai3y.findById(sanai3yByToken._id);
        let pathLink = "http://localhost:7000/uploads/"
        // the name of the image in the data base
        let workObj = { ...req.body, img: pathLink + req.file.originalname }
        // data.img = pathLink + req.file.originalname;
        sanai3y.workStore.push(workObj);
        sanai3y.save();
        res.status(200).json({
            status: "success",
            message: "one work store added successfuuly to this sanai3y",
        })

    } catch (err) {
        // console.log(err.message);
        res.status(500).json({ sucsess: false, message: "There is error on adding work store to this sanai3y", TheError: err.message });
    }
})


// Getting all work stores that have done by this sanai3y    token of this sanai3y is required
route.get("/workstores", async function (req, res) {

    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });

        res.status(200).json({ success: true, message: "You have all work stores that have done by this sanai3y", Data: sanai3y.workStore });

    } catch (err) {
        // console.log(err.message);
        res.status(500).json({ sucsess: false, message: "There is error on getting all work stores that have done by this sanai3y", TheError: err.message });
    }

})


// When sanai3y compelete the job    token of the sanai3y is required
route.put("/jobcompelete", async function (req, res) {
    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });

        // Quiring the job
        const job = await Job.findOne({sanai3yId: sanai3y._id, status: "in progress"});

        // changing the status
        job.status = "compelete";
        job.save()
        res.status(200).json({
            status: "success",
            message: "job status changed to compelete",
            data: job
        })

    }catch (err) {
        // console.log(err.message);
        res.status(500).json({ sucsess: false, message: "There is error on changing the status of this job", TheError: err.message });
    }
})


// Add sanai3y evaluation        The token of the current client and id of sanai3y is required and object of {rate: "", comment: ""} as body of request
route.put("/evaluation/:id", async function (req, res) {

    try {
        // get the current client with the help of current token
        const currentToken = req.headers.authorization;
        const client = await Client.findOne({ token: currentToken });
        const sanai3y = await Sanai3y.findByIdAndUpdate(req.params.id, { $push: { evaluation: { clientId: client._id, rate: req.body.rate, comment: req.body.comment } } })
        res.status(200).json({ success: true, message: "evaluation added to the sanai3y" });

    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on adding evaluation for the sanai3y" });
    }

    // Adding evaluation
    // Sanai3y.findByIdAndUpdate(req.params.id, { $push: { evaluation: { clientId: client._id, rate: req.body.rate, comment: req.body.comment } } }, async (err, data) => {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on adding evaluation for the sanai3y" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "evaluation added to the sanai3y" });
    //     }
    // })
})


// delete sanai3y by admin      id of sanai3y is required
route.delete("/delete/:id", async function (req, res) {
    try {
        const sanai3y = await Sanai3y.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "sanai3y account has been deleted" });
    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on deleting this sanai3y acount" });
    }

    // Sanai3y.findByIdAndDelete(req.params.id, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on deleting this sanai3y acount" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "sanai3y account has been deleted" });
    //     }
    // })

})


// Adding jobs to sanai3y    the id of the accepted proposal is required
route.put("/huntjob/:id", async function (req, res) {

    try {
        // getting the job that contains this proposals
        const requiredJob = await Job.findOne({ "proposals._id": req.params.id });
        // change the status ot this job
        requiredJob.status = "in progress";
        // requiredJob.save();

        // Adding the id of this job to the sanai3y's jobs
        let sanai3yId;
        for (let proposal of requiredJob.proposals) {
            if (proposal._id == req.params.id) {
                sanai3yId = proposal.sanai3yId;
            }
        }
        // Adding the id of sanai3y to this job
        requiredJob.sanai3yId = sanai3yId;
        requiredJob.save();
        const sanai3y = await Sanai3y.findByIdAndUpdate(sanai3yId, { $push: { jobs: requiredJob._id } });
        // change the status of sanai3y from free to busy
        sanai3y.status = "busy";
        sanai3y.jobcount = sanai3y.jobcount -1;
        sanai3y.save();
        res.status(200).json({ success: true, message: "job added to sanai3y", data: requiredJob });

    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on giving this job to this sanai3y" });
    }


    // Sanai3y.findByIdAndUpdate(sanai3yId, { $push: { jobs: requiredJob._id } }, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on giving this job to this sanai3y" });
    //     }
    //     else {
    //         // change the status of sanai3y from free to busy
    //         data.status = "busy";
    //         data.save();
    //         res.status(200).json({ success: true, message: "job added to sanai3y" });
    //     }
    // })
})

// Getting all sanai3ies
route.get("/all", async function (req, res) {

    try {
        const sanai3y = await Sanai3y.find({});
        res.status(200).json({ success: true, message: "You have got all sanai3ies", Data: sanai3y });
    }catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting all sanai3ies" });
    }
    // Sanai3y.find({}, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on getting all sanai3ies" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "You have got all sanai3ies", Data: data });
    //     }
    // })
})


// Getting sanai3y by id        id of sanai3y is required
route.get("/sanai3ies/:id", async function (req, res) {

    try {
        const sanai3y = await Sanai3y.findById(req.params.id);
        res.status(200).json({ success: true, message: "You have got sanai3y by the required id", Data: sanai3y });
    }catch(err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on getting this sanai3y by id" });
    }

    // Sanai3y.findById(req.params.id, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on getting this sanai3y by id" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "You have got sanai3y by the required id", Data: data });
    //     }
    // })
})


// Getting the jobs that done by this sanai3y    token of this sanai3y is required
route.get("/jobs", async function (req, res) {

    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });

        const jobs = await Job.find({ sanai3yId: sanai3y._id });
        res.status(200).json({ success: true, message: "You have all jobs done by this sanai3y", Data: jobs });
    }catch(err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on getting jobs done by this sanai3y" });
    }
    

    // Job.find({ sanai3yId: sanai3y._id }, async function (err, data) {
    //     if (err) {
    //         console.log(err)
    //         res.status(401).json({ success: false, message: "error on getting jobs done by this sanai3y" });
    //     }
    //     else {
    //         res.status(200).json({ success: true, message: "You have all jobs done by this sanai3y", Data: data });
    //     }
    // })
})


// Getting all the proposals that applied by this sanai3y    token of this sanai3y is required
route.get("/proposals", async function (req, res) {

    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });

        const jobs = await Job.find({ "proposals.sanai3yId": sanai3y._id });
        // Job.aggregate([
        //   // {$unwind: {path: "$proposals"}},
        //   {$match: {"proposals.sanai3yId": sanai3y._id}},
        //   {$group: {_id: "$proposals.sanai3yId", totalProposals: {$sum: 1}}},
        //   {$project: {sanai3yId: "$_id", totalProposals: "$totalProposals", _id: 0}},
        //   // {$sort: {totalProducts: -1}}
        //   ], async function (err, data) {

        let proposals = [];
        jobs.forEach((job) => {
            // console.log(job.proposals)
            job.proposals.forEach((proposal) => {
                // console.log (proposal.sanai3yId , sanai3y._id) 
                // console.log (proposal.sanai3yId.equals(sanai3y._id)) 
                if (proposal.sanai3yId.equals(sanai3y._id)) {
                    console.log(proposal)
                    proposals.push(proposal);
                }
            })
        })
        // let proposals = data.map((job)=> job.proposals).filter((proposal)=> proposal.sanai3yId == sanai3y._id)
        // let proposals = data.filter((job)=> {job.proposals.sanai3yId == sanai3y._id})
        res.status(200).json({ success: true, message: "You have all proposals applied by this sanai3y", Data: proposals });

    } catch (err) {
        // console.log(err.message);
        res.status(500).json({ sucsess: false, message: "There is error on getting all the proposals applied by this sanai3y", TheError: err.message });
    }

})


// The add job notification to all related sanai3ies
route.put("/addjobnotification", async (req, res) => {
    try {
        let allSanai3ies = await Sanai3y.find({skills: req.body.skills});
        console.log(allSanai3ies)

        // Adding the notifications
        for (let sanai3y of allSanai3ies) {
            sanai3y.newNotifications.unshift(req.body);
            sanai3y.save();
        }

        res.status(200).json({ success: true, message: "This notification has been added to all related sanai3ies", data: req.body });


    }catch (err) {
        // console.log(err);
        res.status(500).json({ sucsess: false, message: "There is error on adding this notifications to this sanai3y", TheError: err.message });
    }
})


// The accept job notification to the corresponding sanai3y
route.put("/acceptjobnotification", async (req, res) => {
    try {
        let sanai3y = await Sanai3y.findById (req.body.sanai3yId);

        sanai3y.newNotifications.unshift(req.body);
        sanai3y.save();

        res.status(200).json({ success: true, message: "This notification has been added to all related sanai3ies", data: req.body });


    }catch (err) {
        console.log(err);
        res.status(500).json({ sucsess: false, message: "There is error on adding this notifications to this sanai3y", TheError: err.message });
    }
})


// when reading the notifications    >>>>>> token of the current sanai3y is required
route.put("/readnotification", async (req, res) => {
    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        // console.log(currentToken)
        const sanai3y = await Sanai3y.findOne({ token: currentToken });
        // console.log(sanai3y)

        if (sanai3y.newNotifications.length != 0) {
            sanai3y.notifications = [...sanai3y.newNotifications, ...sanai3y.notifications ]
            sanai3y.newNotifications = [];
            sanai3y.save();
        }
        

        res.status(200).json({ success: true, message: "The new notifications have been added to the old notifications" });


    }catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "There is error on adding new notifications to this sanai3y", TheError: err.message });
    }
})


// Getting all notifications of specfic sanai3ies  >>>>> token of sanai3y is required
route.get("/notifications", async (req, res) => {
    try {
        // get the current sanai3y with the help of current token
        const currentToken = req.headers.authorization;
        const sanai3y = await Sanai3y.findOne({ token: currentToken });

        res.status(200).json({ success: true, message: "You have got all notifications of this sanai3y", data: {newNotifications: sanai3y.newNotifications, oldNotifications: sanai3y.notifications} });


    }catch (err) {
        console.log(err);
        res.status(500).json({ sucsess: false, message: "There is error on getting all notifications of this sanai3y", TheError: err.message });
    }
})

module.exports = route;
