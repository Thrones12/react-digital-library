import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import BookSlider from "../../components/BookSlider/BookSlider";
import BookRecommend from "../../components/BookRecommend/BookRecommend";
import PDFPreview from "../../components/PDFPreview/PDFPreview";
import "./BookPage.css";

const BookPage = () => {
    const { id } = useParams();
    const [books, setBooks] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [isAvailable, setIsAvailable] = useState(true);
    const [hasPrivilege, setHasPrivilege] = useState(true);

    return (
        <>
            <PageTitle title={"Tri thức trong tầm tay"} />

            {/* Thông Tin Tài Liệu */}
            <div className='section'>
                <div className='container'>
                    <div className='col col-4'>
                        <img
                            className='book-image'
                            src='/images/book-item.jpg'
                            alt='book'
                        />
                    </div>
                    <div className='col col-5'>
                        <div className='book-detail'>
                            <h1>Luân hồi lạc viên</h1>
                            <p>
                                <span>Tác giả: </span>Phạm Hùng Phong
                            </p>
                            <p>
                                <span>Thể loại: </span>Cate
                            </p>
                            <p>
                                <span>Tình trạng: </span>
                            </p>
                            <p>
                                <span>Loại tài liệu: </span>
                            </p>
                            <p className='book-description'>
                                <span>Mô tả: </span>Đây là một đoạn văn bản dài
                                sẽ bị giới hạn bởi chiều cao cố định của thẻ.
                                Khi nội dung vượt quá số dòng quy định, dấu
                                "..." sẽ xuất hiện tự động. Bạn có thể tiếp tục
                                thêm văn bản ở thêm văn bản ở đây để kiểm tra
                                xem đoạn văn bản có bị giới hạn đúng không. Mô
                                tả: Đây là một đoạn văn bản dài sẽ bị giới hạn
                                bởi chiều cao cố định của thẻ. Khi nội dung vượt
                                quá số dòng quy định, dấu "..." sẽ xuất hiện tự
                                động. Bạn có thể đúng không. hiện tự động. Bạn
                                có thể tiếp tục thêm văn bản ở đây để kiểm tra
                                xem đoạn văn bản có bị giới hạn đúng không. Mô
                                bản ở đây để kiểm tra xem đoạn văn bản có bị
                                giới hạn đúng không.
                            </p>
                            <p>
                                <span>Bản quyền: </span> Thư viện số
                            </p>
                            <p>
                                <span>Nguồn gốc: </span> Thư viện số
                            </p>
                            <p>
                                <span>Lượt tải: </span>135
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                }}
                            >
                                {isAvailable ? (
                                    <>
                                        <button className='btn-read'>
                                            Đọc
                                        </button>
                                        {hasPrivilege ? (
                                            <button className='btn-download'>
                                                Tải xuống
                                            </button>
                                        ) : (
                                            <button className='btn-download'>
                                                Yêu cầu
                                            </button>
                                        )}
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className='recommend-col col col-3'>
                        <div className='top-book'>
                            Tài liệu nổi bật
                            <div className='top-book-list'>
                                <BookRecommend />
                                <BookRecommend />
                                <BookRecommend />
                                <BookRecommend />
                                <BookRecommend />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='book-copyright'>
                        Khi sử dụng tài liệu trong thư viện số bạn đọc phải tuân
                        thủ đầy đủ luật bản quyền.
                    </div>
                </div>
            </div>

            {/* Mô tả */}
            <div className='section' style={{ paddingTop: "40px" }}>
                <div className='container'>
                    <div className='preview'>
                        <p className='preview-title'>Xem trước</p>
                        <PDFPreview />
                    </div>
                </div>
            </div>

            {/* Tài Liệu Cùng Thể Loại */}
            <div className='section'>
                <div className='container'>
                    <div className='book-slider-section'>
                        <div className='book-slider-item'>
                            <div className='slider-header'>
                                <p className='slider-title'>Đã xem</p>
                                <Link to='/'>Xem tất cả</Link>
                            </div>
                            <BookSlider books={books} />
                        </div>
                        <div className='book-slider-item'>
                            <div className='slider-header'>
                                <p className='slider-title'>Cùng thể loại</p>
                                <Link to='/'>Xem tất cả</Link>
                            </div>
                            <BookSlider books={books} />
                        </div>
                        <div className='book-slider-item'>
                            <div className='slider-header'>
                                <p className='slider-title'>Cùng tác giả</p>
                                <Link to='/'>Xem tất cả</Link>
                            </div>
                            <BookSlider books={books} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'></div>
        </>
    );
};

export default BookPage;
