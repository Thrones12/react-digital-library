const User = require("../models/user");
const Validator = require("../utils/Validator");

// Get all user
const GetAll = async (req, res) => {
    try {
        const data = await User.find({}); // Tìm tất cả

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get User thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "User Not Found",
                details: "Lỗi GetAll User: Không tìm thấy user",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll User: " + err,
        });
    }
};

// Get user by id
const GetByID = async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get User thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "User Not Found",
                details: "Lỗi Get User By ID: Không tìm thấy user",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get User By ID: " + err,
        });
    }
};

// Get user by email
const GetByEmail = async (req, res) => {
    try {
        const data = await User.findOne({ email: req.params.email });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get User thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "User Not Found",
                details: "Lỗi Get User By ID: Không tìm thấy user",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get User By ID: " + err,
        });
    }
};

// Tạo mới user
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        console.log(insertData);
        const existingUser = await User.findOne({ email: insertData.email });
        // Kiểm tra user có tồn tại trong csdl không
        if (existingUser) {
            return res.status(409).send({
                message: "Data Already Exists",
                detail: "Lỗi Create User: Email đã tồn tại trong CSDL",
            });
        } else {
            // Validation data
            const validateResult = Validator.UserValidation(insertData);

            if (validateResult.state === true) {
                const newData = new User(validateResult.data);

                await newData.save();
                console.log(newData);

                res.status(200).json({
                    message: "Thêm User thành công",
                    data: newData,
                });
            } else {
                res.status(400).json({
                    message: "Bad Request",
                    details: "Lỗi Create User: " + validateResult.error,
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create User: " + err,
        });
    }
};

// Cập nhập user
const Update = async (req, res) => {
    try {
        // Trong data update cần thiết phải chứa email để tìm, không thì báo lỗi không tìm thấy user
        const updateData = req.body;

        // Validation data
        const validateResult = Validator.UserValidation(updateData);
        console.log(req.file);

        if (validateResult.state === true) {
            if (req.file) {
                updateData.profilePicture =
                    "/images/UserProfilePicture/" + req.file.filename;
                console.log(updateData);
            }
            // Tìm và cập nhập User
            const updatedData = await User.findOneAndUpdate(
                { email: updateData.email },
                updateData,
                { new: true }
            )
                .populate({
                    path: "followedBook",
                    model: "Book",
                })
                .populate({
                    path: "downloadHistory",
                    model: "History",
                    populate: {
                        path: "book",
                        model: "Book",
                    },
                })
                .populate({
                    path: "requestHistory",
                    model: "Request",
                });

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "User not found",
                    details: "Lỗi Update User: Không tìm thấy user",
                });
            }

            res.status(200).json({
                message: "Cập nhập User thành công",
                data: updatedData,
            });
        } else {
            console.log(validateResult.error);

            res.status(400).json({
                message: "Bad Request",
                details: validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update User: " + err,
        });
    }
};

// Xóa user
const Delete = async (req, res) => {
    try {
        const deleteData = await User.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa User thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "User Not Found",
                details: "Lỗi Delete User: Không tìm thấy user",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete User: " + err,
        });
    }
};

module.exports = { GetAll, GetByID, GetByEmail, Create, Update, Delete };
