let express = require("express");
let router = express.Router();
let uploadController = require("../controllers/uploadController");
const { upload } = require("../config/MulterConfig");

router.get("/", uploadController.GetAll);
router.get("/:id", uploadController.GetByID);
router.post("/", upload.single("file"), uploadController.Create);
router.put("/:id", uploadController.Update);
router.delete("/:id", uploadController.Delete);

module.exports = router;
