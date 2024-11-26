let express = require("express");
let router = express.Router();

let userRouter = require("../routers/userRouter");
router.use("/api/users", userRouter);

module.exports = router;
