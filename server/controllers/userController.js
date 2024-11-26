const getUser = (req, res) => {
    res.json({ message: "get user thanh cong" });
};

const getUserById = (req, res) => {
    res.json({ message: "get user by id thanh cong" });
};

const postUser = (req, res) => {
    res.json({ message: "post user thanh cong" });
};

const putUser = (req, res) => {
    res.json({ message: "put user thanh cong" });
};

const deleteUser = (req, res) => {
    res.json({ message: "delete user thanh cong" });
};

module.exports = { getUser, getUserById, postUser, putUser, deleteUser };
