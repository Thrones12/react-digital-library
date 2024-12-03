let express = require("express");
let router = express.Router();
let reviewController = require("../controllers/reviewController");

router.get("/", reviewController.GetAll);
router.get("/:id", reviewController.GetByID);
router.post("/", reviewController.Create);
router.put("/:id", reviewController.Update);
router.delete("/:id", reviewController.Delete);

module.exports = router;
