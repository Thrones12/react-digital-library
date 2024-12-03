const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
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
        type: {
            type: String,
            enum: ["Link", "Source"],
            default: "Link",
        },
        path: {
            type: String,
        },
    },
    content: {
        type: String,
    },
});

const Introduction = mongoose.model("Introduction", shema);

module.exports = Introduction;
