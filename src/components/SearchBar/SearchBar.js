import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import Config from "../../utils/Config";
import "./SearchBar.css";

const SearchBar = ({ isSmall }) => {
    const nav = useNavigate();
    const [query, setQuery] = useState();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const searchParam = searchParams.get("search");
        setQuery(searchParam);
    }, []);

    const keydown = (e) => {
        if (e.key === "Enter") {
            search();
        }
    };

    const search = () => {
        const category = searchParams.get("category");

        if (query && query !== undefined && query !== null && query !== "") {
            if (category) {
                nav(`/library?category=${category}&search=${query}`);
            } else {
                nav(`/library?search=${query}`);
            }
        } else {
            nav(`/library`);
        }
    };

    return (
        <div className={`search-bar ${isSmall ? "small" : ""}`}>
            <input
                type='text'
                placeholder='Tìm kiếm theo tên tài liệu và tác giả'
                value={query}
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                onKeyDown={keydown}
            />
            <button onClick={search}>
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
