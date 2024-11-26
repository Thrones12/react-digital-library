const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const History = mongoose.model("History", shema);

module.exports = History;
