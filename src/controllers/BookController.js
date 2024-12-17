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
    // Lọc dữ liệu theo category hoặc author
    const filteredData = data.filter(
        (d) =>
            d.DescriptiveMetadata.category.name === category ||
            d.DescriptiveMetadata.author === author
    );

    // Sắp xếp theo lượt download giảm dần
    const sortedFilteredData = filteredData.sort(
        (a, b) =>
            b.AdministrativeMetadata.download -
            a.AdministrativeMetadata.download
    );

    // Nếu đã đủ 10 tài liệu, trả về kết quả
    if (sortedFilteredData.length >= 10) {
        return sortedFilteredData.slice(0, 10);
    }

    // Lấy thêm tài liệu có lượt download cao nhất (tránh trùng lặp)
    const remainingCount = 10 - sortedFilteredData.length;
    const additionalData = data
        .filter((d) => !sortedFilteredData.includes(d)) // Tránh trùng lặp
        .sort(
            (a, b) =>
                b.AdministrativeMetadata.download -
                a.AdministrativeMetadata.download
        )
        .slice(0, remainingCount);

    // Kết hợp dữ liệu lọc ban đầu và dữ liệu bổ sung
    return [...sortedFilteredData, ...additionalData];
};

// Tạo một đối tượng để chứa các hàm
const BookController = {
    GetTop6,
    GetTop10Suggest,
};

export default BookController;
