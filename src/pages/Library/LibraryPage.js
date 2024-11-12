import React from "react";
import { Link } from "react-router-dom";
import "./LibraryPage.css";

const LibraryPage = () => {
    return (
        <div className='col col-10'>
            <div className='breadcrumb'>
                <Link to='/home'>Trang chủ</Link>
                <p>{" > "}</p>
                <Link to='/library'>Thư viện</Link>
            </div>

            <div className='tools'>
                <div className='search'>Search</div>
                <div className='sort'>Sort</div>
            </div>

            <div className='cards'>
                <div className='card'>Card</div>
                <div className='card'>Card</div>
                <div className='card'>Card</div>
                <div className='card'>Card</div>
                <div className='card'>Card</div>
                <div className='card'>Card</div>
                <div className='card'>Card</div>
                <div className='card'>Card</div>
            </div>
        </div>
    );
};

export default LibraryPage;
