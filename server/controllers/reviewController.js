const getReview = (req, res) => {
    res.json({ message: "get Review thanh cong" });
};

const getReviewById = (req, res) => {
    res.json({ message: "get Review by id thanh cong" });
};

const postReview = (req, res) => {
    res.json({ message: "post Review thanh cong" });
};

const putReview = (req, res) => {
    res.json({ message: "put Review thanh cong" });
};

const deleteReview = (req, res) => {
    res.json({ message: "delete Review thanh cong" });
};

module.exports = {
    getReview,
    getReviewById,
    postReview,
    putReview,
    deleteReview,
};
