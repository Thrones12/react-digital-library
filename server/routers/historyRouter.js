let express = require("express");
let router = express.Router();
let historyController = require("../controllers/historyController");

router.get("/", historyController.GetAll);
router.get("/:id", historyController.GetByID);
router.post("/", historyController.Create);
router.put("/:id", historyController.Update);
router.delete("/:id", historyController.Delete);

module.exports = router;
