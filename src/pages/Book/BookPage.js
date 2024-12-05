import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../components/PageTitle/PageTitle";
import BookSlider from "../../components/BookSlider/BookSlider";
import BookRecommend from "../../components/BookRecommend/BookRecommend";
import PDFPreview from "../../components/PDFPreview/PDFPreview";
import PPTXPreview from "../../components/PPTXPreview/PPTXPreview";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewList from "../../components/ReviewList/ReviewList";
import BookController from "../../controllers/BookController";
import Config from "../../utils/Config";
import NotiUtils from "../../utils/NotiUtils";
import "./BookPage.css";

const BookPage = () => {
    const BOOK_API = `${Config.BASE_API_URL}/books`;
    const HIS_API = `${Config.BASE_API_URL}/histories`;
    const AUTH_API = `${Config.BASE_API_URL}/auth`;
    const USER_API = `${Config.BASE_API_URL}/users`;
    const SUPPORT_API = `${Config.BASE_API_URL}/supports`;
    const REVIEW_API = `${Config.BASE_API_URL}/reviews`;
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [book, setBook] = useState(null);
    const [isDescriptionExpand, setIsDescriptionExpand] = useState(false);
    const [recommends, setRecommends] = useState([]);
    const [suggests, setSuggests] = useState([]);
    const pageRef = useRef(null);

    // Fetch user
    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo.expiryTime - Date.now() > 0) {
                setUser(userInfo.data);
            }
        } catch (err) {}
    }, []);

    // Fetch book
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BOOK_API}/${id}`);
                setBook(res.data.data);

                const category =
                    res.data.data.DescriptiveMetadata.category.name;
                const author = res.data.data.DescriptiveMetadata.author;

                const allBook = await axios.get(`${BOOK_API}`);
                setSuggests(
                    BookController.GetTop10Suggest(
                        allBook.data.data,
                        category,
                        author
                    )
                );

                setIsDescriptionExpand(false);
                if (pageRef.current) {
                    pageRef.current.scrollIntoView({ behavior: "smooth" });
                }
            } catch (err) {
                NotiUtils.error("Tải tài liệu thất bại");
            }
        };
        fetchData();
    }, [id]);

    //Fetch more documents
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${BOOK_API}`);
            setRecommends(BookController.GetTop6(res.data.data));
        };
        fetchData();
    }, [book, id]);
    const handleDownload = async (e, filePath, book_id) => {
        e.preventDefault(); // Prevent default behavior of the link

        if (!filePath) {
            console.error("No file path provided");
            return;
        }
        const link = document.createElement("a");
        link.href = filePath; // File path or API endpoint
        link.download = filePath.split("/").pop(); // Extract file name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        try {
            const hisRes = await axios.post(HIS_API, {
                user: user._id,
                book: book_id,
            });
            if (
                !user.downloadHistory.some(
                    (item) => item._id === hisRes.data.data._id
                )
            ) {
                user.downloadHistory.push(hisRes.data.data);
            }
            const resUser = await axios.put(USER_API, user);

            // Lưu thông tin user vào localStorage
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const tempTime = userInfo.expiryTime;
            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    data: resUser.data.data,
                    expiryTime: tempTime,
                })
            );

            setUser(resUser.data.data);
        } catch (err) {}
    };

    const handleFollow = async (e, book_id) => {
        e.preventDefault();
        try {
            const bookRes = await axios.get(`${BOOK_API}/${book_id}`);
            user.followedBook.push(bookRes.data.data);

            const resUser = await axios.put(USER_API, user);

            // Lưu thông tin user vào localStorage
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const tempTime = userInfo.expiryTime;
            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    data: resUser.data.data,
                    expiryTime: tempTime,
                })
            );

            setUser(resUser.data.data);
            NotiUtils.success("Theo dõi tài liệu thành công");
        } catch (err) {
            NotiUtils.error(err.response.data.details);
        }
    };
    const handleRequest = async () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            try {
                const res = await axios.post(`${SUPPORT_API}`, {
                    name: "User: " + userInfo.data._id,
                    email: userInfo.data.email,
                    phone: userInfo.data.phone,
                    subject: "Yêu cầu quyền tải sách",
                    message: `Yêu cầu được nâng cấp privilege lên ${book.AdministrativeMetadata.hasPrivilege} để tải sách ${book.DescriptiveMetadata.title}, mã ${book._id}`,
                });
                NotiUtils.success("Gửi yêu cầu thành công");
            } catch (err) {
                NotiUtils.error("Gửi yêu cầu thất bại");
            }
        } else {
            NotiUtils.info("Bạn cần đăng nhập để gửi yêu cầu");
        }
    };

    const handleSubmitReview = async (reviewData) => {
        try {
            const response = await axios.post(REVIEW_API, reviewData);
            NotiUtils.success("Đánh giá thành công");
            setTimeout(() => {
                window.location.reload();
            }, [1500]);
        } catch (err) {
            console.log(err);

            if (err.status === 409) {
                NotiUtils.info("Bạn đã đánh giá tài liệu này rồi");
            } else {
                NotiUtils.error("Đánh giá thất bại");
            }
        }
    };

    return (
        <>
            <PageTitle title={"Tri thức trong tầm tay"} />

            <CustomBreadcrumb />
            {/* Thông Tin Tài Liệu */}
            <div className='section' ref={pageRef}>
                <div className='container'>
                    <div className='col col-4'>
                        <img
                            className='book-image'
                            src={book ? book.DescriptiveMetadata.picture : ""}
                            alt='book'
                        />
                    </div>
                    <div className='col col-5'>
                        <div className='book-detail'>
                            <h1>
                                {book ? book.DescriptiveMetadata.title : ""}
                            </h1>
                            <p>
                                <span>Tác giả: </span>
                                {book ? book.DescriptiveMetadata.author : ""}
                            </p>
                            <p>
                                <span>Xuất bản: </span>
                                {book
                                    ? book.DescriptiveMetadata.publisher +
                                      ", năm " +
                                      book.DescriptiveMetadata.publicationYear
                                    : ""}
                            </p>
                            <p>
                                <span>Thể loại: </span>
                                {book
                                    ? book.DescriptiveMetadata.category.name
                                    : ""}
                            </p>
                            <p>
                                <span>Tình trạng: </span>
                                {book
                                    ? book.AdministrativeMetadata.isAvailable
                                        ? "Có thể tải"
                                        : "Tạm ngưng"
                                    : ""}
                            </p>
                            <p>
                                <span>Loại tài liệu: </span>
                                {book
                                    ? book.AdministrativeMetadata.format +
                                      ", " +
                                      book.AdministrativeMetadata.size
                                    : ""}
                            </p>
                            <div className='book-description-container'>
                                <p
                                    className={`book-description ${
                                        isDescriptionExpand ? "expanded" : ""
                                    }`}
                                >
                                    <span>Mô tả: </span>
                                    {book
                                        ? book.DescriptiveMetadata.description
                                        : ""}
                                </p>
                                <button
                                    id='toggleDescription'
                                    onClick={() =>
                                        setIsDescriptionExpand(
                                            !isDescriptionExpand
                                        )
                                    }
                                >
                                    {isDescriptionExpand
                                        ? "<< Thu gọn >>"
                                        : "<< Xem thêm >>"}
                                </button>
                            </div>
                            <p>
                                <span>Bản quyền: </span>
                                {book
                                    ? book.AdministrativeMetadata.copyright
                                    : ""}
                            </p>
                            <p>
                                <span>Nguồn gốc: </span>
                                {book ? book.AdministrativeMetadata.source : ""}
                            </p>
                            <p>
                                <span>Lượt tải: </span>
                                {book
                                    ? book.AdministrativeMetadata.download
                                    : ""}
                            </p>
                            {user ? (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "20px",
                                    }}
                                >
                                    {book &&
                                    book.AdministrativeMetadata.isAvailable ? (
                                        <>
                                            <button
                                                className='btn-read'
                                                onClick={(e) =>
                                                    handleFollow(e, book._id)
                                                }
                                            >
                                                Theo dõi
                                            </button>
                                            {book.AdministrativeMetadata
                                                .hasPrivilege ===
                                            user.privilege ? (
                                                <button
                                                    className='btn-download'
                                                    onClick={(e) =>
                                                        handleDownload(
                                                            e,
                                                            book.files,
                                                            book._id
                                                        )
                                                    }
                                                >
                                                    Tải xuống
                                                </button>
                                            ) : (
                                                <button
                                                    className='btn-download'
                                                    onClick={handleRequest}
                                                >
                                                    Yêu cầu
                                                </button>
                                            )}
                                        </>
                                    ) : null}
                                </div>
                            ) : (
                                <p>
                                    <span>Lưu ý: </span>
                                    {"Bạn cần đăng nhập để tải tài liệu"}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='recommend-col col col-3'>
                        <div className='top-book'>
                            Tài liệu nổi bật
                            <div className='top-book-list'>
                                {recommends.map((re, index) => (
                                    <BookRecommend key={index} data={re} />
                                ))}
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

            {/* Xem trước */}
            {book && book.AdministrativeMetadata.format === "pdf" ? (
                <div className='section' style={{ paddingTop: "40px" }}>
                    <div className='container'>
                        <div className='preview'>
                            <p className='preview-title'>Xem trước</p>
                            <PDFPreview document={book.files} />
                        </div>
                    </div>
                </div>
            ) : null}

            {book && book.AdministrativeMetadata.format === "pptx" ? (
                <div className='section' style={{ paddingTop: "40px" }}>
                    <div className='container'>
                        <div className='preview'>
                            <p className='preview-title'>Xem trước</p>
                            <PPTXPreview fileUrl={book.files} />
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Đánh giá */}
            {book && (
                <div className='section'>
                    <div className='container'>
                        <div className='preview'>
                            <p className='preview-title'>Đánh giá</p>
                            <div className='review-list'>
                                <ReviewForm
                                    bookId={book._id}
                                    userId={user._id}
                                    onSubmitReview={handleSubmitReview}
                                />
                                <ReviewList bookId={book._id} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tài Liệu Cùng Thể Loại */}
            <div className='section'>
                <div className='container'>
                    <div className='book-slider-section'>
                        <div className='book-slider-item'>
                            <div className='slider-header'>
                                <p className='slider-title'>Gợi ý</p>
                                <Link to='/library'>Xem tất cả</Link>
                            </div>
                            <BookSlider books={suggests} isSmall={true} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'></div>
        </>
    );
};

export default BookPage;
