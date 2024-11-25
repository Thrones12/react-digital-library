import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import "./SearchBar.css";

const SearchBar = ({ isSmall }) => {
    return (
        <div className={`search-bar ${isSmall ? "small" : ""}`}>
            <input
                type='text'
                placeholder='Tìm kiếm: sách, báo và tài liệu khác...'
            />
            <button>
                {isSmall ? (
                    <>
                        <FontAwesomeIcon icon={faSearchengin} />
                    </>
                ) : (
                    "TÌM KIẾM"
                )}
            </button>
        </div>
    );
};

export default SearchBar;
