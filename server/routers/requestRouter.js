let express = require("express");
let router = express.Router();
let requestController = require("../controllers/requestController");

router.get("/", requestController.getRequest);
router.get("/:id", requestController.getRequestById);
router.post("/", requestController.postRequest);
router.put("/:id", requestController.putRequest);
router.delete("/:id", requestController.deleteRequest);

module.exports = router;
