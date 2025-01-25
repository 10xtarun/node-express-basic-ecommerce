const { Schema, default: mongoose } = require("mongoose");

const userSchema = Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User