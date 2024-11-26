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
    publicationYear: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Request = mongoose.model("Request", shema);

module.exports = Request;
