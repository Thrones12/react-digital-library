const bannedWords = ["cặc", "cac", "dm", "đmm", "dm"];

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function validateFullName(fullName) {
    return fullName.length > 0 && fullName !== "" ? true : false;
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
}

function validateSubject(subject) {
    const containsBannedWord = bannedWords.some((word) =>
        subject.toLowerCase().includes(word)
    );
    return !containsBannedWord; // Trả về false nếu có từ cấm
}

function validateContent(content) {
    const containsBannedWord = bannedWords.some((word) =>
        content.toLowerCase().includes(word)
    );
    return !containsBannedWord; // Trả về false nếu có từ cấm
}

function UserValidation(data) {
    const newUser = {};

    // Email
    if (validateEmail(data.email)) {
        newUser.email = data.email;
    } else {
        return { state: false, error: "Email không hợp lệ" };
    }

    // Password
    if (validatePassword(data.password)) {
        newUser.password = data.password;
    } else {
        return {
            state: false,
            error: "Mật khẩu không hợp lệ! Yêu cầu: ít nhất 8 ký tự, chứa chữ cái, kí tự đặc biệt và số.",
        };
    }

    // Fullname
    if (validateFullName(data.fullName)) {
        newUser.fullName = data.fullName;
    } else {
        return {
            state: false,
            error: "Họ tên không được để trống.",
        };
    }

    return {
        state: true,
        data: data,
    };
}

function ReviewValidation(data) {
    if (!validateContent(data.content)) {
        return {
            state: false,
            error: "Nội dung bình luận chứa từ ngữ nhạy cảm",
        };
    }

    return { state: true, data: data };
}

function RequestValidation(data) {
    return { state: true, data: data };
}

function IntroductionValidation(data) {
    return { state: true, data: data };
}

function HistoryValidation(data) {
    return { state: true, data: data };
}

function CategoryValidation(data) {
    return { state: true, data: data };
}

function BookValidation(data) {
    return { state: true, data: data };
}

function SupportValidation(data) {
    return { state: true, data: data };
}

function UploadValidation(data) {
    return { state: true, data: data };
}

module.exports = {
    UserValidation,
    ReviewValidation,
    RequestValidation,
    IntroductionValidation,
    HistoryValidation,
    CategoryValidation,
    BookValidation,
    SupportValidation,
    UploadValidation,
};
