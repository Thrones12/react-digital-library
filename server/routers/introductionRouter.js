let express = require("express");
let router = express.Router();
let introductionController = require("../controllers/introductionController");

router.get("/", introductionController.getIntroduction);
router.get("/:id", introductionController.getIntroductionById);
router.post("/", introductionController.postIntroduction);
router.put("/:id", introductionController.putIntroduction);
router.delete("/:id", introductionController.deleteIntroduction);

module.exports = router;
