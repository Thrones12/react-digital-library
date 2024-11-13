import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <>
            <div className='page-title'>
                <div className='background-image'>
                    <div className='container'>
                        <h2>GIỚI THIỆU</h2>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='about-content'>
                    <h2>Chúng tôi là ai?</h2>
                    <p>
                        Thư viện số là một nền tảng trực tuyến cung cấp quyền
                        truy cập vào kho tài liệu học thuật đa dạng. Với mong
                        muốn tạo ra một môi trường học tập hiện đại và thuận
                        tiện, chúng tôi cung cấp các tài liệu e-books, bài
                        giảng, luận văn, và nghiên cứu trong các lĩnh vực đa
                        dạng.
                    </p>

                    <h2>Vì sao chọn Thư Viện Số?</h2>
                    <ul>
                        <li>
                            Kho tài liệu phong phú: Hơn 10.000 đầu sách và tài
                            liệu học tập.
                        </li>
                        <li>
                            Tiện lợi: Truy cập tài liệu mọi lúc, mọi nơi chỉ cần
                            kết nối internet.
                        </li>
                        <li>
                            Thân thiện với người dùng: Giao diện dễ sử dụng, hỗ
                            trợ tìm kiếm nhanh chóng.
                        </li>
                        <li>
                            Hỗ trợ đa dạng định dạng tài liệu: PDF, ePub, các
                            bài giảng video và audio.
                        </li>
                    </ul>

                    <h2>Tính năng nổi bật</h2>
                    <p>
                        - <strong>Tìm kiếm thông minh:</strong> Tìm tài liệu dễ
                        dàng với từ khóa, chủ đề hoặc tác giả.
                    </p>
                    <p>
                        - <strong>Chế độ đọc tùy chỉnh:</strong> Thay đổi phông
                        chữ, kích thước và màu sắc để dễ đọc hơn.
                    </p>
                    <p>
                        - <strong>Lưu trữ và quản lý tài liệu:</strong> Tạo thư
                        mục cá nhân và lưu các tài liệu yêu thích.
                    </p>

                    <h2>Khám phá ngay</h2>
                    <p>
                        Hãy tham gia cộng đồng thư viện số của chúng tôi và bắt
                        đầu tìm kiếm tài liệu học tập một cách dễ dàng.
                    </p>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
