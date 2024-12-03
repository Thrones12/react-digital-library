import axios from "axios";
import Config from "../utils/Config";

const API = `${Config.BASE_API_URL}/books`;

const GetNew3 = (data) => {
    return data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);
}; // Tạo một đối tượng để chứa các hàm
const IntroductionController = {
    GetNew3,
};

export default IntroductionController;
