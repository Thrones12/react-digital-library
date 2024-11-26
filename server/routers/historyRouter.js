let express = require("express");
let router = express.Router();
let historyController = require("../controllers/historyController");

router.get("/", historyController.getHistory);
router.get("/:id", historyController.getHistoryById);
router.post("/", historyController.postHistory);
router.put("/:id", historyController.putHistory);
router.delete("/:id", historyController.deleteHistory);

module.exports = router;
