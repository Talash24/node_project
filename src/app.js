const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json())

app.post("/signup", async (req, res) => {
   
    const user = new User(req.body);

  
   try {
    await user.save();
    res.send("User Added successfully");
   } catch(err) {
    res.status(400).send("Error saving the user: " + err.message);
   }
});

//find user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    
    try {
         const user = await User.findOne({emailId: userEmail});
         if(user.length === 0){
            res.status(404).send("User not found")
         }else{
              res.send(user);
         }
       
    }catch(err) {
        res.status(400).send("Something went wrong")
    }
})

app.get("/feed", async (req, res) => {
    
    try{
        const users = await User.find({});
        res.send(users)
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete( userId );
        res.send("User deleted successfully")
    }catch(err){
        console.log(err);
        res.status(400).send("Something went wrong ");
    }
});

app.patch("/user/:userId", async (req, res) => {

    const userId = req.params?.userId;
    const data = req.body;

    const ALLOWED_UPDATES = [
        
        "photoUrl", 
        "about", 
        "firstName", 
        "lastName", 
        "age"
    ];
    const isUpdateAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPDATES.includes(k)
    );
    
    if(!isUpdateAllowed){
        res.status(400).send("Update not allowed");
    }

    if(data?.skill.length > 10){
        res.status(400).send("Skills cannot be more than 10");
    }

    try{
       await User.findByIdAndUpdate(userId, data, {
         runValidators: true,
       });
       res.send("User updated successfully")
    }catch(err){
        
        res.status(400).send("Failed to update the data" + err.message);
    }
});

connectDB()
.then(() => {
    console.log("Database connection established..");
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777...");
    });
})
.catch((err) => {
    console.error("Database cannot be connected");
})
