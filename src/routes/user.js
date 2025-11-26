const express = require('express');
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { connection } = require('mongoose');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"
router.get("/user/requests", userAuth, async (req, res) => {
    try{

        const loggedInUser = req.user;
      
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"]);

        res.json({
            message: "Data fetched successfully",
            data: connectionRequests
        })

    } catch(err) {
        console.log(err);
        req.status(400).send("ERROR: " + err.message);
    }
});

router.get("/user/requests/received", userAuth, async (req, res) => {
    try{

        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"},
            ],
        }).populate("fromUserId", USER_SAFE_DATA);

        const data = connectionRequests.map((row) => row.fromUserId);

        res.json({
            data: data
        })

    } catch(err) {
        res.send(400).send("ERROR: " + err.message);
    }
})

module.exports = router;