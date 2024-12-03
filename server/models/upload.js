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
    file: {
        type: String,
    },
    message: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Canceled"],
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

const Upload = mongoose.model("Upload", shema);

module.exports = Upload;
