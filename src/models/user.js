const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    age: {
        type: String,
    }, 
    gender: {
        type: String,
        validate(value){
            if(!["male", "female"].includes(value)){
                throw new Error("There exist only two gender in our universe");
            }
        }
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "Default about the user"
    },
    skills: {
        type: [String]
    }

}, {
    timestamps: true,
});


module.exports = mongoose.model("User", userSchema);