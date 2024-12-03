let express = require("express");
let router = express.Router();
let introductionController = require("../controllers/introductionController");

router.get("/", introductionController.GetAll);
router.get("/:id", introductionController.GetByID);
router.post("/", introductionController.Create);
router.put("/:id", introductionController.Update);
router.delete("/:id", introductionController.Delete);

module.exports = router;
