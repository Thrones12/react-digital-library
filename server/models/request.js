const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    category: {
        type: String,
    },
    publisher: {
        type: String,
    },
    reason: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "InProcess", "Completed"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Request = mongoose.model("Request", shema);

module.exports = Request;
