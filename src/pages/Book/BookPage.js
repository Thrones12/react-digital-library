import React from "react";
import { useParams } from "react-router-dom";

const BookPage = () => {
    const { id } = useParams();
    return (
        <div className='container'>
            <div>Book Page {id}</div>
        </div>
    );
};

export default BookPage;
