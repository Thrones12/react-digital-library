const Introduction = require("../models/introduction");
const Validator = require("../utils/Validator");

// Get All
const GetAll = async (req, res) => {
    try {
        const data = await Introduction.find({}).populate({
            path: "author",
            model: "User",
        });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get Introduction thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Introduction Not Found",
                details: "Lỗi GetAll Introduction: Không tìm thấy Introduction",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll Introduction: " + err,
        });
    }
};

// Get By ID
const GetByID = async (req, res) => {
    try {
        const data = await Introduction.findOne({
            _id: req.params.id,
        }).populate({
            path: "author",
            model: "User",
        });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Introduction thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Introduction Not Found",
                details:
                    "Lỗi Get Introduction By ID: Không tìm thấy Introduction",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Introduction By ID: " + err,
        });
    }
};

// Tạo mới Introduction
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        console.log(insertData);
        const existingData = await Introduction.findOne({
            title: insertData.title,
        });
        // Kiểm tra review có tồn tại trong csdl không
        if (existingData) {
            return res.status(409).send({
                message: "Data Already Exists",
                details:
                    "Lỗi Create Introduction: Introduction đã tồn tại trong CSDL",
            });
        } else {
            // Validation data
            const validateResult = Validator.IntroductionValidation(insertData);

            if (validateResult.state === true) {
                const newData = new Introduction(validateResult.data);

                await newData.save();

                res.status(200).json({
                    message: "Thêm Introduction thành công",
                    data: newData,
                });
            } else {
                res.status(400).json({
                    message: "Bad Introduction",
                    details: "Lỗi Create Introduction: " + validateResult.error,
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create Introduction: " + err,
        });
    }
};

// Cập nhập Introduction
const Update = async (req, res) => {
    try {
        const updateData = req.body;
        // Validation data
        const validateResult = Validator.IntroductionValidation(updateData);

        if (validateResult.state === true) {
            // Tìm và cập nhập Introduction

            const updatedData = await Introduction.findOneAndUpdate(
                { _id: req.params.id },
                updateData,
                { new: true }
            );

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "Introduction not found",
                    details:
                        "Lỗi Update Introduction: Không tìm thấy Introduction",
                });
            }

            res.status(200).json({
                message: "Cập nhập Introduction thành công",
                data: updatedData,
            });
        } else {
            res.status(400).json({
                message: "Bad Introduction",
                details: "Lỗi Update Introduction: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update Introduction: " + err,
        });
    }
};

// Xóa Introduction
const Delete = async (req, res) => {
    try {
        const deleteData = await Introduction.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa Introduction thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "Introduction Not Found",
                details: "Lỗi Delete Introduction: Không tìm thấy Introduction",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete Introduction: " + err,
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
