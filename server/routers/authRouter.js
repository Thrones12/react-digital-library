let express = require("express");
let router = express.Router();
let authController = require("../controllers/authController");

router.post("/login", authController.Login);
router.post("/register", authController.Register);
router.post("/send-otp", authController.SendVerificationCode);

module.exports = router;