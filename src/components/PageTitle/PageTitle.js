import React from "react";
import "./PageTitle.css";

const PageTitle = ({ title }) => {
    return (
        <div className='section-search'>
            <div className='section-search-overlay'></div>
            <div className='page-title page-title-top'>
                <h6 className='page-title-text'>Thư viện số</h6>
            </div>
            <div className='page-title'>
                <h1 className='page-title-text'>{title}</h1>
            </div>
            <div className='search-bar'>
                <input
                    type='text'
                    placeholder='Tìm kiếm: sách, báo và tài liệu khác...'
                />
                <button>TÌM KIẾM</button>
            </div>
        </div>
    );
};

export default PageTitle;
