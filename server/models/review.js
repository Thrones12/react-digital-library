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
    rating: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
    },
});

const Review = mongoose.model("Review", shema);

module.exports = Review;
