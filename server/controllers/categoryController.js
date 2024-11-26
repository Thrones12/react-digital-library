const getCategory = (req, res) => {
    res.json({ message: "get Category thanh cong" });
};

const getCategoryById = (req, res) => {
    res.json({ message: "get Category by id thanh cong" });
};

const postCategory = (req, res) => {
    res.json({ message: "post Category thanh cong" });
};

const putCategory = (req, res) => {
    res.json({ message: "put Category thanh cong" });
};

const deleteCategory = (req, res) => {
    res.json({ message: "delete Category thanh cong" });
};

module.exports = {
    getCategory,
    getCategoryById,
    postCategory,
    putCategory,
    deleteCategory,
};
