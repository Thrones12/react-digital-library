let express = require("express");
let router = express.Router();
let userController = require("../controllers/userController");
const { uploadUser } = require("../config/MulterConfig");

router.get("/", userController.GetAll);
router.get("/:id", userController.GetByID);
router.get("/email/:email", userController.GetByEmail);
router.post("/", uploadUser.single("file"), userController.Create);
router.put("/", uploadUser.single("file"), userController.Update);
router.delete("/:id", userController.Delete);

module.exports = router;
