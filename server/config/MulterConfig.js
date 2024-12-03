const multer = require("multer");
const path = require("path");

// Cấu hình storage cho multer của upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../../public/uploads"); // Tạo đường dẫn tuyệt đối
        cb(null, uploadPath); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // Lấy phần mở rộng file
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});
// Cấu hình storage cho multer của userRoute
const storageUser = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(
            __dirname,
            "../../public/images/UserProfilePicture"
        ); // Tạo đường dẫn tuyệt đối
        cb(null, uploadPath); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname); // Lấy phần mở rộng file
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

// Khởi tạo middleware upload
const upload = multer({ storageUser });
const uploadUser = multer({ storage: storageUser });

module.exports = { upload, uploadUser };
