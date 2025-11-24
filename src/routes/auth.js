const express = require('express');
const router = express.Router();
const { validateSignUpData } = require("../utils/validation");
const { validateLoginData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    validateSignUpData(req);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    validateLoginData(req);
   
    const isPasswordValid = await user.validatePassword(password);
   
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid Email or Password!!");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});




module.exports = router;