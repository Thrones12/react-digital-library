import axios from "axios";
import Config from "../utils/Config";

const API = `${Config.BASE_API_URL}/books`;

const GetTop6 = (data) => {
    return data
        .sort(
            (a, b) =>
                b.AdministrativeMetadata.download -
                a.AdministrativeMetadata.download
        )
        .slice(0, 6);
};
const GetTop10Suggest = (data, category, author) => {
    return data
        .filter(
            (d) =>
                d.DescriptiveMetadata.category.name === category ||
                d.DescriptiveMetadata.author === author
        )
        .sort(
            (a, b) =>
                b.AdministrativeMetadata.download -
                a.AdministrativeMetadata.download
        )
        .slice(0, 6);
};

// Tạo một đối tượng để chứa các hàm
const BookController = {
    GetTop6,
    GetTop10Suggest,
};

export default BookController;
