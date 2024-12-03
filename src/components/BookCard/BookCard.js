import React from "react";
import { Link } from "react-router-dom";
import "./BookCard.css";

// With: Link, height: card-img
const BookCard = ({ data, cardWith, cardHeight }) => {
    return (
        <Link
            to={`/book/${data._id}`}
            className='book-card-link'
            style={{ width: cardWith ? cardWith : "" }}
        >
            <div className='book-card'>
                <img
                    className='card-img'
                    style={{ height: cardHeight ? cardHeight : "" }}
                    src={data.DescriptiveMetadata.picture}
                    alt='book'
                />
                <div className='card-title'>
                    {data.DescriptiveMetadata.title}
                </div>
            </div>
        </Link>
    );
};

export default BookCard;
