let express = require("express");
let router = express.Router();
let bookController = require("../controllers/bookController");

router.get("/", bookController.GetAll);
router.get("/:id", bookController.GetByID);
router.post("/", bookController.Create);
router.put("/:id", bookController.Update);
router.delete("/:id", bookController.Delete);
router.put("/download/:id", bookController.Download);

module.exports = router;
