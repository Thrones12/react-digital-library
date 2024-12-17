import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CounterSection from "../../components/Counter/CounterSection";
import PageTitle from "../../components/PageTitle/PageTitle";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import ButtonToRight from "../../components/ButtonToRight/ButtonToRight";
import Introduction from "../../components/Introduction/Introduction";
import Config from "../../utils/Config";
import BookController from "../../controllers/BookController";
import CategoryController from "../../controllers/CategoryController";
import IntroductionController from "../../controllers/IntroductionController";
import "./HomePage.css";

const HomePage = () => {
    const API = Config.BASE_API_URL;
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [recommends, setRecommends] = useState([]);
    const [introductions, setIntroductions] = useState([]);

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

    //Fetch category
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/categories`);
                setCategories(res.data.data);
            } catch (err) {}
        };
        fetchData();
    }, []);

    //Fetch books
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/books`);
                setRecommends(BookController.GetTop6(res.data.data));
            } catch (err) {}
        };
        fetchData();
    }, []);

    //Fetch introduction
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API}/introductions`);
                setIntroductions(IntroductionController.GetNew3(res.data.data));
            } catch (err) {}
        };
        fetchData();
    }, []);

    return (
        <main>
            <PageTitle title={"Tri thức trong tầm tay"} hasSearchBar={true} />

            {/* SKEW IMAGE SECTION */}
            <div className='section'>
                <div className='container'>
                    <div className='skew-images'>
                        <img src='/images/homepage-skew-img-1.png' alt='skew' />
                        <img src='/images/homepage-skew-img-2.png' alt='skew' />
                        <img src='/images/homepage-skew-img-3.png' alt='skew' />
                        <img src='/images/homepage-skew-img-4.png' alt='skew' />
                    </div>
                </div>
            </div>

            {/* WEB DATA SECTION */}
            <div className='section'>
                <div className='container'>
                    <div className='web-data'>
                        <div className='web-data-item download-data'>
                            <img src='/images/icon-download.png' />
                            <h6>Lượt tải sách</h6>
                            <CounterSection totalCount={81760} />{" "}
                        </div>
                        <div className='web-data-item book-data'>
                            <img src='/images/icon-book.png' />
                            <h6>Số lượng sách</h6>
                            <CounterSection totalCount={10000} />{" "}
                        </div>
                        <div className='web-data-item user-data'>
                            <img src='/images/icon-user.png' />
                            <h6>Người dùng</h6>
                            <CounterSection totalCount={5175} />{" "}
                        </div>
                        <div className='web-data-item cate-data'>
                            <img src='/images/icon-cate.png' />
                            <h6>Thể loại sách</h6>
                            <CounterSection totalCount={58} />{" "}
                        </div>
                    </div>
                </div>
            </div>

            {/* CATEGORIES SLIDER SECTION */}
            <div className='section'>
                <div className='line'></div>
                <h6>Khám phá ngay</h6>
                <h1 className='section-title'>Thể loại nổi bật</h1>
                <p className='section-title-description'>
                    Khám phá những thể loại sách được yêu thích nhất, từ tiểu
                    thuyết đến khoa học và lịch sử.
                </p>
                <div className='category-slider'>
                    <Slider {...cateSettings}>
                        {categories.map((cate, index) => (
                            <CategoryCard key={index} category={cate} />
                        ))}
                    </Slider>
                </div>
            </div>

            {/* TOP DOCUMENT SECTION */}
            <div className='section'>
                <div className='line'></div>
                <h6>Khám phá ngay</h6>
                <h1 className='section-title'>Tài liệu đề cử</h1>
                <p className='section-title-description'>
                    Khám phá những thể loại sách được yêu thích nhất, từ tiểu
                    thuyết đến khoa học và lịch sử.
                </p>
                <div className='recommend'>
                    {recommends.map((r, index) => (
                        <Link key={index} to={`/book/${r._id}`}>
                            <div className='recommend-item'>
                                <img
                                    src={r.DescriptiveMetadata.picture}
                                    alt='book'
                                />
                                <div className='recommend-text'>
                                    <h5 className='recommend-item-title'>
                                        {r.DescriptiveMetadata.title}
                                    </h5>
                                    <p className='recommend-item-description'>
                                        {r.DescriptiveMetadata.description}
                                    </p>
                                    <div className='recommend-item-readmore'>
                                        <p>Xem thêm</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* BOOK INTRODUCE */}
            <div className='section'>
                <div className='line'></div>
                <h6>Khám phá ngay</h6>
                <h1 className='section-title'>Giới thiệu sách</h1>
                <p className='section-title-description'>
                    Khám phá những thể loại sách được yêu thích nhất, từ tiểu
                    thuyết đến khoa học và lịch sử. Mỗi thể loại mang đến cho
                    bạn một thế giới tri thức phong phú và đa dạng.
                </p>
                <div className='container '>
                    <div className='book-introduction'>
                        {introductions.map((i, index) => (
                            <Introduction key={index} object={i} />
                        ))}
                    </div>
                </div>
                <ButtonToRight link={"/introductions"} text={"Xem thêm"} />
            </div>

            {/* Tạo khoảng cách với footer */}
            <div className='section'></div>
        </main>
    );
};

export default HomePage;
