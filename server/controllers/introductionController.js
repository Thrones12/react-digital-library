const getIntroduction = (req, res) => {
    res.json({ message: "get Introduction thanh cong" });
};

const getIntroductionById = (req, res) => {
    res.json({ message: "get Introduction by id thanh cong" });
};

const postIntroduction = (req, res) => {
    res.json({ message: "post Introduction thanh cong" });
};

const putIntroduction = (req, res) => {
    res.json({ message: "put Introduction thanh cong" });
};

const deleteIntroduction = (req, res) => {
    res.json({ message: "delete Introduction thanh cong" });
};

module.exports = {
    getIntroduction,
    getIntroductionById,
    postIntroduction,
    putIntroduction,
    deleteIntroduction,
};
