const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", shema);

module.exports = User;
