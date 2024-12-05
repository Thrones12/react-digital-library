const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    header: {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    DescriptiveMetadata: {
        barcode: {
            type: String,
            required: true,
            unique: true,
        },
        picture: {
            type: String,
            default: "/images/books/default.jpg",
        },
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        publisher: {
            type: String,
        },
        publicationYear: {
            type: String,
        },
        subAuthor: [
            {
                type: String,
            },
        ],
        language: {
            type: String,
        },
    },
    AdministrativeMetadata: {
        isAvailable: {
            type: Boolean,
            default: true,
        },
        hasprivilege: {
            type: Number,
            enum: [0, 1], // 0: user, 1: admin
            default: 0,
        },
        type: {
            type: String,
            enum: ["Text", "PPT", "Audio", "Video"],
            default: "Text",
            require: true,
        },
        format: {
            type: String,
            enum: ["pdf", "ppt", "mp3", "mp4"],
            default: "pdf",
            require: true,
        },
        size: {
            type: String,
        },
        copyright: {
            type: String,
            require: true,
        },
        source: {
            type: String,
        },
        download: {
            type: Number,
            default: 0,
        },
    },
    files: {
        type: String,
    },
});

const Book = mongoose.model("Book", schema);

module.exports = Book;
