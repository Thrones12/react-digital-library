import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./PageTitle.css";

const PageTitle = ({ title, hasSearchBar }) => {
    return (
        <div className='section-search'>
            <div className='section-search-overlay'></div>
            <div className='page-title page-title-top'>
                <h6 className='page-title-text'>Thư viện số</h6>
            </div>
            <div className='page-title'>
                <h1 className='page-title-text'>{title}</h1>
            </div>
            {hasSearchBar ? <SearchBar /> : ""}
        </div>
    );
};

export default PageTitle;
