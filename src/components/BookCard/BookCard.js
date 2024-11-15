import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";

const BookCard = ({ link, title, author, cate, img }) => {
    return (
        <Link to={link} className='book-card-link'>
            <div className='book-card'>
                <img className='card-img' src={img} alt='book' />
                <div className='card-title'>{title}</div>
                <div className='card-footer'>
                    <div className='card-author'>{author}</div>
                    <div className='card-cate'>{cate}</div>
                </div>
            </div>
        </Link>
    );
};

export default BookCard;
