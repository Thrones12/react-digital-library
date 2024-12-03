import axios from "axios";
import Config from "../utils/Config";

const API = `${Config.BASE_API_URL}/categories`;

const GetTop10 = (data) => {
    return data.sort((a, b) => b.download - a.download).slice(0, 10);
}; // Tạo một đối tượng để chứa các hàm
const CategoryController = {
    GetTop10,
};

export default CategoryController;
