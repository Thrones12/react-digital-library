const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

const Category = mongoose.model("Category", shema);

module.exports = Category;
