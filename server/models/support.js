const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Waiting", "Processing", "Completed", "Canceled"],
        default: "Waiting",
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

const Support = mongoose.model("Support", shema);

module.exports = Support;
