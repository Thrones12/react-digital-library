const Review = require("../models/review");
const Validator = require("../utils/Validator");

// Get All
const GetAll = async (req, res) => {
    try {
        const data = await Review.find({})
            .populate({
                path: "user",
                model: "User",
            })
            .populate({
                path: "book",
                model: "Book",
            }); // Tìm tất cả

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get Review thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Review Not Found",
                details: "Lỗi GetAll Review: Không tìm thấy review",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll Review: " + err,
        });
    }
};

// Get By ID
const GetByID = async (req, res) => {
    try {
        const data = await Review.findOne({ _id: req.params.id })
            .populate({
                path: "user",
                model: "User",
            })
            .populate({
                path: "book",
                model: "Book",
            });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Review thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Review Not Found",
                details: "Lỗi Get Review By ID: Không tìm thấy Review",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Review By ID: " + err,
        });
    }
};

// Get By Book
const GetByBook = async (req, res) => {
    try {
        const data = await Review.find({ book: req.params.book })
            .populate({
                path: "user",
                model: "User",
            })
            .populate({
                path: "book",
                model: "Book",
            });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Review thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Review Not Found",
                details: "Lỗi Get Review By ID: Không tìm thấy Review",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Review By ID: " + err,
        });
    }
};

// Tạo mới review
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        const existingData = await Review.findOne({
            user: insertData.user,
            book: insertData.book,
        });

        // Kiểm tra review có tồn tại trong csdl không
        if (existingData) {
            return res.status(409).send({
                message: "Data Already Exists",
                details: "Lỗi Create Review: Review đã tồn tại trong CSDL",
            });
        } else {
            // Validation data
            const validateResult = Validator.ReviewValidation(insertData);

            if (validateResult.state === true) {
                const newData = new Review(validateResult.data);

                await newData.save();
                console.log(newData);

                res.status(200).json({
                    message: "Thêm Review thành công",
                    data: newData,
                });
            } else {
                res.status(400).json({
                    message: "Bad Request",
                    details: "Lỗi Create Review: " + validateResult.error,
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create Review: " + err,
        });
    }
};

// Cập nhập review
const Update = async (req, res) => {
    try {
        const updateData = req.body;
        // Validation data
        const validateResult = Validator.ReviewValidation(updateData);

        if (validateResult.state === true) {
            // Tìm và cập nhập Review
            const updatedData = await Review.findOneAndUpdate(
                { _id: req.params.id },
                updateData,
                { new: true }
            );

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "Review not found",
                    details: "Lỗi Update Review: Không tìm thấy Review",
                });
            }

            res.status(200).json({
                message: "Cập nhập Review thành công",
                data: updatedData,
            });
        } else {
            res.status(400).json({
                message: "Bad Request",
                details: "Lỗi Update Review: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update Review: " + err,
        });
    }
};

// Xóa user
const Delete = async (req, res) => {
    try {
        const deleteData = await Review.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa Review thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "Review Not Found",
                details: "Lỗi Delete Review: Không tìm thấy Review",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete Review: " + err,
        });
    }
};

module.exports = {
    GetAll,
    GetByID,
    GetByBook,
    Create,
    Update,
    Delete,
};
