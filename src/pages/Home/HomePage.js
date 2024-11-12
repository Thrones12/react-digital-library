import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.css";

const HomePage = () => {
    const cateSettings = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true, // Bật tính năng tự động chuyển slide
        autoplaySpeed: 5000, // Thời gian tự động chuyển slide (ms)
        centerMode: false,
    };
    return (
        <main>
            <div className='section-search'>
                <div className='background-image'>
                    <div className='search-bar'>
                        <input
                            type='text'
                            placeholder='Tìm kiếm: sách, báo và tài liệu khác...'
                        />
                        <button>TÌM KIẾM</button>
                    </div>
                </div>
            </div>

            <div className='section'>
                <h6>Khám phá ngay</h6>
                <h2 className='section-title'>Thể loại nổi bật</h2>
                <p className='section-title-description'>
                    Khám phá những thể loại sách được yêu thích nhất, từ tiểu
                    thuyết đến khoa học và lịch sử. Mỗi thể loại mang đến cho
                    bạn một thế giới tri thức phong phú và đa dạng.
                </p>
                <div className='category-slider'>
                    <Slider {...cateSettings}>
                        <div className='slide-wrapper'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div>
                                <h3 className='silde-title'>
                                    Luân hồi lạc viên
                                </h3>
                            </div>
                        </div>
                        <div className='slide-wrapper'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div>
                                <h3 className='silde-title'>
                                    Luân hồi lạc viên
                                </h3>
                            </div>
                        </div>
                        <div className='slide-wrapper'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div>
                                <h3 className='silde-title'>
                                    Luân hồi lạc viên
                                </h3>
                            </div>
                        </div>
                        <div className='slide-wrapper'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div>
                                <h3 className='silde-title'>
                                    Luân hồi lạc viên
                                </h3>
                            </div>
                        </div>
                        <div className='slide-wrapper'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div>
                                <h3 className='silde-title'>
                                    Luân hồi lạc viên
                                </h3>
                            </div>
                        </div>
                        <div className='slide-wrapper'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div>
                                <h3 className='silde-title'>
                                    Luân hồi lạc viên
                                </h3>
                            </div>
                        </div>
                        <div className='slide-wrapper'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div>
                                <h3 className='silde-title'>
                                    Luân hồi lạc viên
                                </h3>
                            </div>
                        </div>
                        <div className='slide-wrapper'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div>
                                <h3 className='silde-title'>
                                    Luân hồi lạc viên
                                </h3>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>

            <div className='section'>
                <h6>Khám phá ngay</h6>
                <h2 className='section-title'>Tài liệu đề cử</h2>
                <p className='section-title-description'>
                    Khám phá những thể loại sách được yêu thích nhất, từ tiểu
                    thuyết đến khoa học và lịch sử.
                </p>
                <div className='recommend'>
                    <Link to='/book'>
                        <div className='recommend-item'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div className='recommend-text'>
                                <h5 className='recommend-item-title'>
                                    Luân hồi lạc viên
                                </h5>
                                <p className='recommend-item-description'>
                                    Đây là một đoạn văn bản dài sẽ bị giới hạn
                                    bởi chiều cao cố định của thẻ. Khi nội dung
                                    vượt quá số dòng quy định, dấu "..." sẽ xuất
                                    hiện tự động. Bạn có thể tiếp tục thêm văn
                                    bản ở đây để kiểm tra xem đoạn văn bản có bị
                                    giới hạn đúng không.
                                </p>
                                <div className='recommend-item-readmore'>
                                    <p>Xem thêm</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/book'>
                        <div className='recommend-item'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div className='recommend-text'>
                                <h5 className='recommend-item-title'>
                                    Luân hồi lạc viên
                                </h5>
                                <p className='recommend-item-description'>
                                    Đây là một đoạn văn bản dài sẽ bị giới hạn
                                    bởi chiều cao cố định của thẻ. Khi nội dung
                                    vượt quá số dòng quy định, dấu "..." sẽ xuất
                                    hiện tự động. Bạn có thể tiếp tục thêm văn
                                    bản ở đây để kiểm tra xem đoạn văn bản có bị
                                    giới hạn đúng không.
                                </p>
                                <div className='recommend-item-readmore'>
                                    <p>Xem thêm</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/book'>
                        <div className='recommend-item'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div className='recommend-text'>
                                <h5 className='recommend-item-title'>
                                    Luân hồi lạc viên
                                </h5>
                                <p className='recommend-item-description'>
                                    Đây là một đoạn văn bản dài sẽ bị giới hạn
                                    bởi chiều cao cố định của thẻ. Khi nội dung
                                    vượt quá số dòng quy định, dấu "..." sẽ xuất
                                    hiện tự động. Bạn có thể tiếp tục thêm văn
                                    bản ở đây để kiểm tra xem đoạn văn bản có bị
                                    giới hạn đúng không.
                                </p>
                                <div className='recommend-item-readmore'>
                                    <p>Xem thêm</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/home'>
                        <div className='recommend-item'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div className='recommend-text'>
                                <h5 className='recommend-item-title'>
                                    Luân hồi lạc viên
                                </h5>
                                <p className='recommend-item-description'>
                                    Đây là một đoạn văn bản dài sẽ bị giới hạn
                                    bởi chiều cao cố định của thẻ. Khi nội dung
                                    vượt quá số dòng quy định, dấu "..." sẽ xuất
                                    hiện tự động. Bạn có thể tiếp tục thêm văn
                                    bản ở đây để kiểm tra xem đoạn văn bản có bị
                                    giới hạn đúng không.
                                </p>
                                <div className='recommend-item-readmore'>
                                    <p>Xem thêm</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/home'>
                        <div className='recommend-item'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div className='recommend-text'>
                                <h5 className='recommend-item-title'>
                                    Luân hồi lạc viên
                                </h5>
                                <p className='recommend-item-description'>
                                    Đây là một đoạn văn bản dài sẽ bị giới hạn
                                    bởi chiều cao cố định của thẻ. Khi nội dung
                                    vượt quá số dòng quy định, dấu "..." sẽ xuất
                                    hiện tự động. Bạn có thể tiếp tục thêm văn
                                    bản ở đây để kiểm tra xem đoạn văn bản có bị
                                    giới hạn đúng không.
                                </p>
                                <div className='recommend-item-readmore'>
                                    <p>Xem thêm</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/home'>
                        <div className='recommend-item'>
                            <img src='/images/book-item.jpg' alt='book' />
                            <div className='recommend-text'>
                                <h5 className='recommend-item-title'>
                                    Luân hồi lạc viên
                                </h5>
                                <p className='recommend-item-description'>
                                    Đây là một đoạn văn bản dài sẽ bị giới hạn
                                    bởi chiều cao cố định của thẻ. Khi nội dung
                                    vượt quá số dòng quy định, dấu "..." sẽ xuất
                                    hiện tự động. Bạn có thể tiếp tục thêm văn
                                    bản ở đây để kiểm tra xem đoạn văn bản có bị
                                    giới hạn đúng không.
                                </p>
                                <div className='recommend-item-readmore'>
                                    <p>Xem thêm</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className='section'>
                <h6>Khám phá ngay</h6>
                <h2 className='section-title'>Số liệu nổi bật</h2>
                <p className='section-title-description'>
                    Khám phá những thể loại sách được yêu thích nhất, từ tiểu
                    thuyết đến khoa học và lịch sử.
                </p>
                <div className='container'>
                    <div className='web-data'>
                        <div className='web-data-item'>
                            <h6>Lượt tải sách</h6>
                            <p>865718</p>
                        </div>
                        <div className='web-data-item'>
                            <h6>Số lượng sách</h6>
                            <p>10000</p>
                        </div>
                        <div className='web-data-item'>
                            <h6>Người dùng</h6>
                            <p>5175</p>
                        </div>
                        <div className='web-data-item'>
                            <h6>Thể loại sách</h6>
                            <p>58</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='section'>
                <h6>Khám phá ngay</h6>
                <h2 className='section-title'>Giới thiệu sách</h2>
                <p className='section-title-description'>
                    Khám phá những thể loại sách được yêu thích nhất, từ tiểu
                    thuyết đến khoa học và lịch sử. Mỗi thể loại mang đến cho
                    bạn một thế giới tri thức phong phú và đa dạng.
                </p>
                <div className='container'>
                    <div className='book-introduction'>
                        <div className='introduction-item'>
                            <iframe
                                src='https://www.youtube.com/embed/Mcc6QEhKBo4?start=371'
                                title='YouTube video player'
                                frameborder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowfullscreen
                            ></iframe>
                            <div className='introduction-text'>
                                <div className='introduction-title'>
                                    Đi tìm lẽ sống
                                </div>
                                <div className='introduction-description'>
                                    "Đi Tìm Lẽ Sống" của Viktor E. Frankl là
                                    cuốn sách kinh điển về sức mạnh tinh thần và
                                    ý nghĩa cuộc sống. Tác giả, một nhà tâm lý
                                    học người Áo, đã viết cuốn sách này dựa trên
                                    trải nghiệm sống sót từ trại tập trung Đức
                                    Quốc xã. Thông qua những đau đớn và mất mát
                                    tột cùng, Frankl khẳng định rằng mỗi người
                                    đều có thể tìm thấy ý nghĩa cuộc đời mình,
                                    ngay cả trong nghịch cảnh khắc nghiệt nhất.
                                    Đây là tác phẩm truyền cảm hứng mạnh mẽ,
                                    giúp độc giả chiêm nghiệm về mục đích sống
                                    và sức mạnh nội tại.
                                </div>
                                <div className='introduction-more'>
                                    <Link to='/introduction'>
                                        Chi tiết {">"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='introduction-item'>
                            <iframe
                                src='https://www.youtube.com/embed/Mcc6QEhKBo4?start=371'
                                title='YouTube video player'
                                frameborder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowfullscreen
                            ></iframe>
                            <div className='introduction-text'>
                                <div className='introduction-title'>
                                    Đi tìm lẽ sống
                                </div>
                                <div className='introduction-description'>
                                    "Đi Tìm Lẽ Sống" của Viktor E. Frankl là
                                    cuốn sách kinh điển về sức mạnh tinh thần và
                                    ý nghĩa cuộc sống. Tác giả, một nhà tâm lý
                                    học người Áo, đã viết cuốn sách này dựa trên
                                    trải nghiệm sống sót từ trại tập trung Đức
                                    Quốc xã. Thông qua những đau đớn và mất mát
                                    tột cùng, Frankl khẳng định rằng mỗi người
                                    đều có thể tìm thấy ý nghĩa cuộc đời mình,
                                    ngay cả trong nghịch cảnh khắc nghiệt nhất.
                                    Đây là tác phẩm truyền cảm hứng mạnh mẽ,
                                    giúp độc giả chiêm nghiệm về mục đích sống
                                    và sức mạnh nội tại.
                                </div>
                                <div className='introduction-more'>
                                    <Link to='/introduction'>
                                        Chi tiết {">"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='introduction-item'>
                            <iframe
                                src='https://www.youtube.com/embed/Mcc6QEhKBo4?start=371'
                                title='YouTube video player'
                                frameborder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowfullscreen
                            ></iframe>
                            <div className='introduction-text'>
                                <div className='introduction-title'>
                                    Đi tìm lẽ sống
                                </div>
                                <div className='introduction-description'>
                                    "Đi Tìm Lẽ Sống" của Viktor E. Frankl là
                                    cuốn sách kinh điển về sức mạnh tinh thần và
                                    ý nghĩa cuộc sống. Tác giả, một nhà tâm lý
                                    học người Áo, đã viết cuốn sách này dựa trên
                                    trải nghiệm sống sót từ trại tập trung Đức
                                    Quốc xã. Thông qua những đau đớn và mất mát
                                    tột cùng, Frankl khẳng định rằng mỗi người
                                    đều có thể tìm thấy ý nghĩa cuộc đời mình,
                                    ngay cả trong nghịch cảnh khắc nghiệt nhất.
                                    Đây là tác phẩm truyền cảm hứng mạnh mẽ,
                                    giúp độc giả chiêm nghiệm về mục đích sống
                                    và sức mạnh nội tại.
                                </div>
                                <div className='introduction-more'>
                                    <Link to='/introduction'>
                                        Chi tiết {">"}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to='/introduction' className='introduction-btn-readmore'>
                    <button>Xem thêm</button>
                </Link>
            </div>
        </main>
    );
};

export default HomePage;
