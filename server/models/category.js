const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    picture: {
        type: String,
        required: true,
        default: "/images/categories/default.jpg",
    },
    download: {
        type: Number,
        default: 0,
    },
});

const Category = mongoose.model("Category", shema);

module.exports = Category;
