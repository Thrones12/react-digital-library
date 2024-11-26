const getBook = (req, res) => {
    res.json({ message: "get book thanh cong" });
};

const getBookById = (req, res) => {
    res.json({ message: "get Book by id thanh cong" });
};

const postBook = (req, res) => {
    res.json({ message: "post Book thanh cong" });
};

const putBook = (req, res) => {
    res.json({ message: "put Book thanh cong" });
};

const deleteBook = (req, res) => {
    res.json({ message: "delete Book thanh cong" });
};

module.exports = { getBook, getBookById, postBook, putBook, deleteBook };
