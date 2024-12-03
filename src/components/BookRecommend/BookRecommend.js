import React from "react";
import { Link } from "react-router-dom";
import "./BookRecommend.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const BookRecommend = ({ data }) => {
    return (
        <Link className='book-recommend-link' to={`/book/${data._id}`}>
            <div className='book-recommend-card'>
                <img src={data.DescriptiveMetadata.picture} alt='Book' />
                <div className='book-recommend-title'>
                    {data.DescriptiveMetadata.title}
                </div>
                <div className='book-recommend-data'>
                    <FontAwesomeIcon icon={faDownload} />
                    <p>{data.AdministrativeMetadata.download}</p>
                </div>
            </div>
        </Link>
    );
};

export default BookRecommend;
