let express = require("express");
let router = express.Router();
let supportController = require("../controllers/supportController");

router.get("/", supportController.GetAll);
router.get("/:id", supportController.GetByID);
router.post("/", supportController.Create);
router.put("/:id", supportController.Update);
router.delete("/:id", supportController.Delete);

module.exports = router;
