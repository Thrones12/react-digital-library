let express = require("express");
let router = express.Router();
let reviewController = require("../controllers/reviewController");

router.get("/", reviewController.getReview);
router.get("/:id", reviewController.getReviewById);
router.post("/", reviewController.postReview);
router.put("/:id", reviewController.putReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
