const Category = require("../models/category");
const Validator = require("../utils/Validator");

// Get All
const GetAll = async (req, res) => {
    try {
        const data = await Category.find({});

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data.length > 0) {
            res.status(200).json({
                message: "Get Category thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Category Not Found",
                details: "Lỗi GetAll Category: Không tìm thấy Category",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi GetAll Category: " + err,
        });
    }
};

// Get By ID
const GetByID = async (req, res) => {
    try {
        const data = await Category.findOne({ _id: req.params.id });

        // Get có dữ liệu thì trả về 200 không thì trả về 404
        if (data) {
            res.status(200).json({
                message: "Get Category thành công",
                data: data,
            });
        } else {
            res.status(404).json({
                message: "Category Not Found",
                details: "Lỗi Get Category By ID: Không tìm thấy Category",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Get Category By ID: " + err,
        });
    }
};

// Tạo mới Category
const Create = async (req, res) => {
    try {
        const insertData = req.body;
        const existingData = await Category.findOne({
            name: insertData.name,
        });
        // Kiểm tra review có tồn tại trong csdl không
        if (existingData) {
            return res.status(409).send({
                message: "Data Already Exists",
                details: "Lỗi Create Category: Category đã tồn tại trong CSDL",
            });
        } else {
            // Validation data
            const validateResult = Validator.CategoryValidation(insertData);

            if (validateResult.state === true) {
                const newData = new Category(validateResult.data);

                await newData.save();

                res.status(200).json({
                    message: "Thêm Category thành công",
                    data: newData,
                });
            } else {
                res.status(400).json({
                    message: "Bad Category",
                    details: "Lỗi Create Category: " + validateResult.error,
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Create Category: " + err,
        });
    }
};

// Cập nhập Category
const Update = async (req, res) => {
    try {
        const updateData = req.body;
        // Validation data
        const validateResult = Validator.CategoryValidation(updateData);

        if (validateResult.state === true) {
            // Tìm và cập nhập Category

            const updatedData = await Category.findOneAndUpdate(
                { _id: req.params.id },
                updateData,
                { new: true }
            );

            // updatedData không có dữ liệu trả về => không tìm thấy dữ liệu
            if (!updatedData) {
                res.status(404).json({
                    message: "Category not found",
                    details: "Lỗi Update Category: Không tìm thấy Category",
                });
            }

            res.status(200).json({
                message: "Cập nhập Category thành công",
                data: updatedData,
            });
        } else {
            res.status(400).json({
                message: "Bad Category",
                details: "Lỗi Update Category: " + validateResult.error,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Update Category: " + err,
        });
    }
};

// Xóa Category
const Delete = async (req, res) => {
    try {
        const deleteData = await Category.findOneAndDelete(
            { _id: req.params.id },
            { new: true }
        );

        if (deleteData) {
            res.status(200).json({
                message: "Xóa Category thành công",
                data: deleteData,
            });
        } else {
            res.status(404).json({
                message: "Category Not Found",
                details: "Lỗi Delete Category: Không tìm thấy Category",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Delete Category: " + err,
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
