const Support = require("../models/support");
const Validator = require("../utils/Validator");

// Get All
const GetAll = async (req, res) => {
    try {
        const data = await Support.find({}); // Tìm tất cả

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get Support thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Support Not Found",
                details: "Lỗi GetAll Support: Không tìm thấy Support",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll Support: " + err,
        });
    }
};

// Get By ID
const GetByID = async (req, res) => {
    try {
        const data = await Support.findOne({ _id: req.params.id });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Support thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Support Not Found",
                details: "Lỗi Get Support By ID: Không tìm thấy Support",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Support By ID: " + err,
        });
    }
};

// Tạo mới Support
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        // Validation data
        const validateResult = Validator.SupportValidation(insertData);

        if (validateResult.state === true) {
            const newData = new Support(validateResult.data);

            await newData.save();
            console.log(newData);

            res.status(200).json({
                message: "Thêm Support thành công",
                data: newData,
            });
        } else {
            res.status(400).json({
                message: "Bad Request",
                details: "Lỗi Create Support: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create Support: " + err,
        });
    }
};

// Cập nhập Support
const Update = async (req, res) => {
    try {
        const updateData = req.body;
        // Validation data
        const validateResult = Validator.SupportValidation(updateData);

        if (validateResult.state === true) {
            // Tìm và cập nhập Support
            const updatedData = await Support.findOneAndUpdate(
                { _id: req.params.id },
                updateData,
                { new: true }
            );

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "Support not found",
                    details: "Lỗi Update Support: Không tìm thấy Support",
                });
            }

            res.status(200).json({
                message: "Cập nhập Support thành công",
                data: updatedData,
            });
        } else {
            res.status(400).json({
                message: "Bad Request",
                details: "Lỗi Update Support: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update Support: " + err,
        });
    }
};

// Xóa user
const Delete = async (req, res) => {
    try {
        const deleteData = await Support.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa Support thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "Support Not Found",
                details: "Lỗi Delete Support: Không tìm thấy Support",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete Support: " + err,
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
