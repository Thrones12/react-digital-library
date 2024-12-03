let express = require("express");
let router = express.Router();
let requestController = require("../controllers/requestController");

router.get("/", requestController.GetAll);
router.get("/:id", requestController.GetByID);
router.get("/getByUser/:user", requestController.GetByUser);
router.post("/", requestController.Create);
router.put("/:id", requestController.Update);
router.delete("/:id", requestController.Delete);

module.exports = router;
