let express = require("express");
let router = express.Router();
let userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.get("/:id", userController.getUserById);
router.post("/", userController.postUser);
router.put("/:id", userController.putUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
