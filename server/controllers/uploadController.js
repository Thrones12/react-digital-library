const Upload = require("../models/upload");
const Validator = require("../utils/Validator");

// Get All
const GetAll = async (req, res) => {
    try {
        const data = await Upload.find({}); // Tìm tất cả

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get Upload thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Upload Not Found",
                details: "Lỗi GetAll Upload: Không tìm thấy Upload",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll Upload: " + err,
        });
    }
};

// Get By ID
const GetByID = async (req, res) => {
    try {
        const data = await Upload.findOne({ _id: req.params.id });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Upload thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Upload Not Found",
                details: "Lỗi Get Upload By ID: Không tìm thấy Upload",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Upload By ID: " + err,
        });
    }
};

// Tạo mới Upload
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        // Validation data
        const validateResult = Validator.UploadValidation(insertData);

        if (validateResult.state === true) {
            validateResult.data.file = "/uploads/" + req.file.filename;
            const newData = new Upload(validateResult.data);

            await newData.save();
            console.log(newData);

            res.status(200).json({
                message: "Thêm Upload thành công",
                data: newData,
            });
        } else {
            res.status(400).json({
                message: "Bad Request",
                details: "Lỗi Create Upload: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create Upload: " + err,
        });
    }
};

// Cập nhập Upload
const Update = async (req, res) => {
    try {
        const updateData = req.body;
        // Validation data
        const validateResult = Validator.UploadValidation(updateData);

        if (validateResult.state === true) {
            // Tìm và cập nhập Upload
            const updatedData = await Upload.findOneAndUpdate(
                { _id: req.params.id },
                updateData,
                { new: true }
            );

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "Upload not found",
                    details: "Lỗi Update Upload: Không tìm thấy Upload",
                });
            }

            res.status(200).json({
                message: "Cập nhập Upload thành công",
                data: updatedData,
            });
        } else {
            res.status(400).json({
                message: "Bad Request",
                details: "Lỗi Update Upload: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update Upload: " + err,
        });
    }
};

// Xóa user
const Delete = async (req, res) => {
    try {
        const deleteData = await Upload.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa Upload thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "Upload Not Found",
                details: "Lỗi Delete Upload: Không tìm thấy Upload",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete Upload: " + err,
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
