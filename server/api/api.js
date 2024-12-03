let express = require("express");
let router = express.Router();

let userRouter = require("../routers/userRouter");
router.use("/api/users", userRouter);

let reviewRouter = require("../routers/reviewRouter");
router.use("/api/reviews", reviewRouter);

let requestRouter = require("../routers/requestRouter");
router.use("/api/requests", requestRouter);

let introductionRouter = require("../routers/introductionRouter");
router.use("/api/introductions", introductionRouter);

let historyRouter = require("../routers/historyRouter");
router.use("/api/histories", historyRouter);

let categoryRouter = require("../routers/categoryRouter");
router.use("/api/categories", categoryRouter);

let supportRouter = require("../routers/supportRouter");
router.use("/api/supports", supportRouter);

let uploadRouter = require("../routers/uploadRouter");
router.use("/api/uploads", uploadRouter);

let bookRouter = require("../routers/bookRouter");
router.use("/api/books", bookRouter);

let authRouter = require("../routers/authRouter");
router.use("/api/auth", authRouter);

module.exports = router;
