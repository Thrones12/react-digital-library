const getRequest = (req, res) => {
    res.json({ message: "get Request thanh cong" });
};

const getRequestById = (req, res) => {
    res.json({ message: "get Request by id thanh cong" });
};

const postRequest = (req, res) => {
    res.json({ message: "post Request thanh cong" });
};

const putRequest = (req, res) => {
    res.json({ message: "put Request thanh cong" });
};

const deleteRequest = (req, res) => {
    res.json({ message: "delete Request thanh cong" });
};

module.exports = {
    getRequest,
    getRequestById,
    postRequest,
    putRequest,
    deleteRequest,
};
