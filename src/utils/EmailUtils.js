const nodemailer = require("nodemailer");

const sendVerificationCode = async (email) => {
    const OTP = Math.floor(1000 + Math.random() * 9000);

    // Cấu hình Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "21110273@student.hcmute.edu.vn",
            pass: "Phong123",
        },
    });

    // Nội dung email
    const mailOptions = {
        from: "21110273@student.hcmute.edu.vn",
        to: email, // Email nhận
        subject: "Mã xác nhận của bạn",
        text: `Mã xác nhận của bạn là: ${OTP}`,
    };

    try {
        // Gửi email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const EmailUtils = {
    sendVerificationCode,
};

export default EmailUtils;
