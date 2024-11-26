let express = require("express");
let router = express.Router();
let categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategory);
router.get("/:id", categoryController.getCategoryById);
router.post("/", categoryController.postCategory);
router.put("/:id", categoryController.putCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
