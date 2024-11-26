const mongoose = require("mongoose");

const shema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    },
});

const Book = mongoose.model("Book", shema);

module.exports = Book;
