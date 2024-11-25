import React from "react";
import { Link } from "react-router-dom";
import "./BookRecommend.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const BookRecommend = () => {
    return (
        <Link className='book-recommend-link' to='/'>
            <div className='book-recommend-card'>
                <img src='/images/book-item.jpg' alt='Book' />
                <div className='book-recommend-title'>
                    Luân hồi lạc viên hồi lạc viên hồi lạc viên viên hồi lạc
                    viên viên hồi lạc viên
                </div>
                <div className='book-recommend-data'>
                    <FontAwesomeIcon icon={faDownload} />
                    <p>16572</p>
                </div>
            </div>
        </Link>
    );
};

export default BookRecommend;
