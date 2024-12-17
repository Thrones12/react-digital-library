const Book = require("../models/book");
const Validator = require("../utils/Validator");

// Get All
const GetAll = async (req, res) => {
    try {
        const data = await Book.find({})
            .populate({
                path: "header.creator",
                model: "User",
            })
            .populate({
                path: "DescriptiveMetadata.category",
                model: "Category",
            }); // Tìm tất cả

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get Book thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Book Not Found",
                details: "Lỗi GetAll Book: Không tìm thấy Book",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll Book: " + err,
        });
    }
};

// Get By ID
const GetByID = async (req, res) => {
    try {
        const data = await Book.findOne({ _id: req.params.id })
            .populate({
                path: "header.creator",
                model: "User",
            })
            .populate({
                path: "DescriptiveMetadata.category",
                model: "Category",
            }); // Tìm tất cả

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Book thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Book Not Found",
                details: "Lỗi Get Book By ID: Không tìm thấy Book",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Book By ID: " + err,
        });
    }
};

// Tạo mới Book
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        const existingData = await Book.findOne({
            "DescriptiveMetadata.title": insertData.DescriptiveMetadata.title,
            "DescriptiveMetadata.author": insertData.DescriptiveMetadata.author,
        });

        // Kiểm tra review có tồn tại trong csdl không
        if (existingData) {
            return res.status(409).send({
                message: "Data Already Exists",
                details: "Lỗi Create Book: Book đã tồn tại trong CSDL",
            });
        } else {
            // Validation data
            const validateResult = Validator.BookValidation(insertData);

            if (validateResult.state === true) {
                const newData = new Book(validateResult.data);
                console.log(newData);

                await newData.save();

                res.status(200).json({
                    message: "Thêm Book thành công",
                    data: newData,
                });
            } else {
                res.status(400).json({
                    message: "Bad Book",
                    details: "Lỗi Create Book: " + validateResult.error,
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create Book: " + err,
        });
    }
};

// Cập nhập Book
const Update = async (req, res) => {
    try {
        const updateData = req.body;
        // Validation data
        const validateResult = Validator.BookValidation(updateData);

        if (validateResult.state === true) {
            // Tìm và cập nhập Book

            const updatedData = await Book.findOneAndUpdate(
                { _id: req.params.id },
                updateData,
                { new: true }
            );

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "Book not found",
                    details: "Lỗi Update Book: Không tìm thấy Book",
                });
            }

            res.status(200).json({
                message: "Cập nhập Book thành công",
                data: updatedData,
            });
        } else {
            res.status(400).json({
                message: "Bad Book",
                details: "Lỗi Update Book: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update Book: " + err,
        });
    }
};

// Xóa Book
const Delete = async (req, res) => {
    try {
        const deleteData = await Book.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa Book thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "Book Not Found",
                details: "Lỗi Delete Book: Không tìm thấy Book",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete Book: " + err,
        });
    }
};

// Tăng lượt tải Book
const Download = async (req, res) => {
    try {
        const data = await Book.findOne({ _id: req.params.id }); // Tìm tất cả

        data.AdministrativeMetadata.download += 1;

        data.save();

        res.status(200).json({
            message: "Tăng lượt tải Book thành công",
            data: data,
        });
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Download Book: " + err,
        });
    }
};

module.exports = { GetAll, GetByID, Create, Update, Delete, Download };
