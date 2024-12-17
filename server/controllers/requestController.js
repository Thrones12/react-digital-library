const Request = require("../models/request");
const Validator = require("../utils/Validator");

// Get All
const GetAll = async (req, res) => {
    try {
        const data = await Request.find({}).populate({
            path: "user",
            model: "User",
        });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get Request thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Request Not Found",
                details: "Lỗi GetAll Request: Không tìm thấy Request",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll Request: " + err,
        });
    }
};

// Get By ID
const GetByID = async (req, res) => {
    try {
        const data = await Request.findOne({ _id: req.params.id }).populate({
            path: "user",
            model: "User",
        });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Request thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Request Not Found",
                details: "Lỗi Get Request By ID: Không tìm thấy Request",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Request By ID: " + err,
        });
    }
};

// Get By User
const GetByUser = async (req, res) => {
    try {
        const data = await Request.find({ user: req.params.user });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Request thành công",
                data: data,
            });
        } else {
            res.status(200).json({
                message: "Get Request thành công",
                data: [],
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Request By ID: " + err,
        });
    }
};

// Tạo mới Request
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        const existingData = await Request.findOne({
            user: insertData.user,
            title: insertData.title,
            author: insertData.author,
        });
        // Kiểm tra review có tồn tại trong csdl không
        if (existingData) {
            return res.status(409).send({
                message: "Data Already Exists",
                details: "Lỗi Create Request: Request đã tồn tại trong CSDL",
            });
        } else {
            // Validation data
            const validateResult = Validator.RequestValidation(insertData);

            if (validateResult.state === true) {
                const newData = new Request(validateResult.data);

                await newData.save();

                res.status(200).json({
                    message: "Thêm Request thành công",
                    data: newData,
                });
            } else {
                res.status(400).json({
                    message: "Bad Request",
                    details: "Lỗi Create Request: " + validateResult.error,
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create Request: " + err,
        });
    }
};

// Cập nhập Request
const Update = async (req, res) => {
    try {
        const updateData = req.body;
        // Validation data
        const validateResult = Validator.RequestValidation(updateData);

        if (validateResult.state === true) {
            // Tìm và cập nhập Request

            const updatedData = await Request.findOneAndUpdate(
                { _id: req.params.id },
                updateData,
                { new: true }
            );

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "Request not found",
                    details: "Lỗi Update Request: Không tìm thấy Request",
                });
            }

            res.status(200).json({
                message: "Cập nhập Request thành công",
                data: updatedData,
            });
        } else {
            res.status(400).json({
                message: "Bad Request",
                details: "Lỗi Update Request: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update Request: " + err,
        });
    }
};

// Xóa request
const Delete = async (req, res) => {
    try {
        const deleteData = await Request.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa Request thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "Request Not Found",
                details: "Lỗi Delete Request: Không tìm thấy Request",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete Request: " + err,
        });
    }
};

module.exports = {
    GetAll,
    GetByID,
    GetByUser,
    Create,
    Update,
    Delete,
};
