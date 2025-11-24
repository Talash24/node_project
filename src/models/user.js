const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email address " + value)
            }
        }
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

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id}, "cha_khabo4jkldami", {
        expiresIn: "7d",
    });

    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser, 
        passwordHash
    );

    return isPasswordValid;
};


module.exports = mongoose.model("User", userSchema);