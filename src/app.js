const express = require("express");

const app = express();

app.get("/user", (req, res) => {
    res.send({firstName: "ashraful", lastname: "alam"});
});

app.use("/hello", (req, res) => {
    res.send("Hello from the server.....");
});

app.use("/testing", (req, res) => {
    res.send("server testing 1,2,3,4....")
});

app.post("/user", (req, res) => {
    res.send("data saved successfully to the DB");
});
app.listen(3000, () => {
    console.log("Server is successfully listening on port 3000...");
});