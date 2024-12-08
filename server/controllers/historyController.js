const History = require("../models/history");
const Validator = require("../utils/Validator");

// Get All
const GetAll = async (req, res) => {
    try {
        const data = await History.find({})
            .populate({
                path: "user",
                model: "User",
            })
            .populate({
                path: "book",
                model: "Book",
                populate: {
                    path: "DescriptiveMetadata.category",
                    model: "Category",
                },
            });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get History thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "History Not Found",
                details: "Lỗi GetAll History: Không tìm thấy History",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll History: " + err,
        });
    }
};

// Get By ID
const GetByID = async (req, res) => {
    try {
        const data = await History.findOne({ _id: req.params.id })
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
                message: "Get History thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "History Not Found",
                details: "Lỗi Get History By ID: Không tìm thấy History",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get History By ID: " + err,
        });
    }
};

// Tạo mới History
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        const existingData = await History.findOne({
            user: insertData.user,
            book: insertData.book,
        });

        // Kiểm tra review có tồn tại trong csdl không
        if (existingData) {
            existingData.downloadAt = Date.now();
            const newData = new History(existingData);

            await newData.save();
            return res.status(200).send({
                message: "Thêm History lại thành công",
                data: newData,
            });
        } else {
            // Validation data
            const validateResult = Validator.HistoryValidation(insertData);

            if (validateResult.state === true) {
                const newData = new History(validateResult.data);

                await newData.save();

                res.status(200).json({
                    message: "Thêm History thành công",
                    data: newData,
                });
            } else {
                res.status(400).json({
                    message: "Bad History",
                    details: "Lỗi Create History: " + validateResult.error,
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create History: " + err,
        });
    }
};

// Cập nhập History
const Update = async (req, res) => {
    try {
        const updateData = req.body;
        // Validation data
        const validateResult = Validator.HistoryValidation(updateData);

        if (validateResult.state === true) {
            // Tìm và cập nhập History

            const updatedData = await History.findOneAndUpdate(
                { _id: req.params.id },
                updateData,
                { new: true }
            );

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "History not found",
                    details: "Lỗi Update History: Không tìm thấy History",
                });
            }

            res.status(200).json({
                message: "Cập nhập History thành công",
                data: updatedData,
            });
        } else {
            res.status(400).json({
                message: "Bad History",
                details: "Lỗi Update History: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update History: " + err,
        });
    }
};

// Xóa History
const Delete = async (req, res) => {
    try {
        const deleteData = await History.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa History thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "History Not Found",
                details: "Lỗi Delete History: Không tìm thấy History",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete History: " + err,
        });
    }
};

module.exports = {
    GetAll,
    GetByID,
    Create,
    Update,
    Delete,
};
