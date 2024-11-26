let express = require("express");
let router = express.Router();
let bookController = require("../controllers/bookController");

router.get("/", bookController.getBook);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.postBook);
router.put("/:id", bookController.putBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
