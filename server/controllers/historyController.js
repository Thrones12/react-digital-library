const getHistory = (req, res) => {
    res.json({ message: "get History thanh cong" });
};

const getHistoryById = (req, res) => {
    res.json({ message: "get History by id thanh cong" });
};

const postHistory = (req, res) => {
    res.json({ message: "post History thanh cong" });
};

const putHistory = (req, res) => {
    res.json({ message: "put History thanh cong" });
};

const deleteHistory = (req, res) => {
    res.json({ message: "delete History thanh cong" });
};

module.exports = {
    getHistory,
    getHistoryById,
    postHistory,
    putHistory,
    deleteHistory,
};
