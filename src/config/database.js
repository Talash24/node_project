const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://ashraful:4vBEevnsKbMAGoCE@firstnode.zkiyw8y.mongodb.net/DevTinder"
    );
};

module.exports = connectDB;