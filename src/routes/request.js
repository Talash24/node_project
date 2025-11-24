const express = require('express');
const router = express.Router();
const {userAuth} = require("../middlewares/auth")

router.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    console.log("Sending a connection request");
    res.send(user.firstName + " sending connection request ");
});


module.exports = router;