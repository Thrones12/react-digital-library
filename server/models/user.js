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
    profilePicture: {
        type: String,
        default: "image/UserProfilePicture/default.jpg",
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User",
    },
    privilege: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Locked"],
        default: "Inactive",
    },
    otpVertify: {
        type: String,
        default: "0000",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    followedBook: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        },
    ],
    downloadHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "History",
        },
    ],
    requestHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Request",
        },
    ],
});

const User = mongoose.model("User", shema);

module.exports = User;
