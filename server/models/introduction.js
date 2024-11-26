const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resource: {
        type: String,
        enum: ["Link", "Source"],
        path: String,
    },
    content: {
        type: String,
    },
});

const Introduction = mongoose.model("Introduction", shema);

module.exports = Introduction;
