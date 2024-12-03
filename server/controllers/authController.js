const User = require("../models/user");
let userController = require("../controllers/userController");
const Validator = require("../utils/Validator");
const nodemailer = require("nodemailer");

// Login
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);

        const user = await User.findOne({ email: email })
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

        if (user) {
            if (user.password === password) {
                if (user.status === "Active") {
                    res.status(200).json({
                        message: "Đăng nhập thành công",
                        data: user,
                    });
                } else if (user.status === "Inactive") {
                    res.status(403).json({
                        message: "Forbidden",
                        details: "Lỗi Login: Tài khoản chưa được kích hoạt",
                    });
                } else {
                    res.status(423).json({
                        message: "Locked",
                        details: "Lỗi Login: Tài khoản đã bị khóa",
                    });
                }
            } else {
                res.status(401).json({
                    message: "Unauthorized",
                    details: "Lỗi Login: Mật khẩu không đúng",
                });
            }
        } else {
            res.status(404).json({
                message: "User Not Found",
                details: "Lỗi Login: Tài khoản không tồn tại",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Login - authController: " + err,
        });
    }
};

// Register
const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Find user để kiểm tra email đã được đăng ký
        const user = await User.findOne({ email: email });

        if (user) {
            res.status(409).json({
                message: "Conflict",
                details: "Lỗi Register - authController: Email đã được đăng ký",
            });
        } else {
            const validateResult = Validator.UserValidation({
                fullName,
                email,
                password,
            });

            if (validateResult.state === true) {
                const newData = new User(validateResult.data);

                await newData.save();

                res.status(200).json({
                    message: "Success",
                    data: newData,
                });
            } else {
                res.status(400).json({
                    message: "Bad Request",
                    details:
                        "Lỗi Register - authController: " +
                        validateResult.error,
                });
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "Lỗi server",
            details: "Lỗi Register - authController: " + err,
        });
    }
};

// Send otp
const SendVerificationCode = async (req, res) => {
    const { email } = req.body;
    const OTP = Math.floor(1000 + Math.random() * 9000);
    console.log(OTP);

    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nguyenduy7003@gmail.com", // Thay bằng email của bạn
            pass: "tesf daab xvbr fyqo", // Thay bằng mật khẩu email của bạn
        },
    });

    // Nội dung email
    const mailOptions = {
        from: "nguyenduy7003@gmail.com",
        to: email, // Email nhận
        subject: "Mã xác nhận của bạn",
        text: `Mã xác nhận của bạn là: ${OTP}`,
    };

    try {
        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
        const user = await User.findOne({ email: email });

        console.log(user);

        user.otpVertify = OTP + "";
        const updatedData = await User.findOneAndUpdate(
            { email: user.email },
            user,
            { new: true }
        );
    } catch (error) {
        console.log("Lỗi Send otp" + error);
        res.status(500).json({
            message: "Lỗi Server",
            details: "Lỗi Send otp" + error,
        });
    }
};

module.exports = { Login, Register, SendVerificationCode };
