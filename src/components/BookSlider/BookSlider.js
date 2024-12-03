import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import BookCard from "../BookCard/BookCard";
import "./BookSlider.css";

const BookSlider = ({ books, scrollRef }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Bật tính năng tự động chuyển slide
        autoplaySpeed: 4000, // Thời gian tự động chuyển slide (ms)
        centerMode: false,
    };
    return (
        <div className='book-slider'>
            <Slider {...settings}>
                {books.map((b, index) => (
                    <BookCard key={index} data={b} scrollRef={scrollRef} />
                ))}
            </Slider>
        </div>
    );
};

export default BookSlider;
