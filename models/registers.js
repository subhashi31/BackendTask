const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userid : {
        type: String,
        required: true,
        unique: true
    },

    username : {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true,
        unique: true
    }

})

const Register = new mongoose.model("Register", userSchema);
module.exports = Register;