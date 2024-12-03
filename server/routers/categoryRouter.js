let express = require("express");
let router = express.Router();
let categoryController = require("../controllers/categoryController");

router.get("/", categoryController.GetAll);
router.get("/:id", categoryController.GetByID);
router.post("/", categoryController.Create);
router.put("/:id", categoryController.Update);
router.delete("/:id", categoryController.Delete);

module.exports = router;
