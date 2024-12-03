import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import PageTitle from "../../components/PageTitle/PageTitle";
import BookCard from "../../components/BookCard/BookCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Pagination from "../../components/Pagination/Pagination";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import Config from "../../utils/Config";
import NotiUtils from "../../utils/NotiUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./LibraryPage.css";

const LibraryPage = () => {
    const BOOK_API = `${Config.BASE_API_URL}/books`;
    const CATE_API = `${Config.BASE_API_URL}/categories`;
    const [searchParams] = useSearchParams();
    const [category, setCategory] = useState("");
    const [books, setBooks] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sort, setSort] = useState({
        name: "Sắp xếp",
        type: "All",
    });
    const [isAscending, setIsAscending] = useState(true);

    const listRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(BOOK_API);
                const searchQuery = searchParams.get("search");
                const tempCategory = searchParams.get("category");
                setCategory(tempCategory);

                const filterData = (data) => {
                    if (searchQuery && searchQuery.trim()) {
                        const title = data.DescriptiveMetadata.title;
                        const author = data.DescriptiveMetadata.author;
                        return (
                            title.toLowerCase().includes(searchQuery) ||
                            author.toLowerCase().includes(searchQuery)
                        );
                    }
                    return true;
                };

                let filteredBooks = res.data.data.filter(filterData);

                if (tempCategory) {
                    filteredBooks = filteredBooks.filter(
                        (data) =>
                            data.DescriptiveMetadata.category.name ===
                            tempCategory
                    );
                }

                let sortedBooks = sortBook(filteredBooks, sort, isAscending);

                setBooks(sortedBooks);
                setPageData(sortedBooks.slice(0, Config.LIMIT));
            } catch (err) {
                NotiUtils.error("Tải trang thất bại");
            }
        };

        fetchData();
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(CATE_API);
                setCategories(res.data.data);
            } catch (err) {
                NotiUtils.error("Tải trang thất bại");
            }
        };
        fetchData();
    }, []);

    const standardSort = [
        { name: "Tên tài liệu", type: "title" },
        { name: "Ngày tạo", type: "createdAt" },
        { name: "Lượt tải", type: "download" },
    ];

    const handleSort = (sort, isAscending) => {
        setBooks(sortBook(books, sort, isAscending));
    };

    const sortBook = (data, sort, isAscending) => {
        // Tạo bản sao của data để tránh thay đổi trực tiếp
        const sortedData = [...data];
        if (sort === "title") {
            sortedData.sort((a, b) => {
                const aValue = a.DescriptiveMetadata.title;
                const bValue = b.DescriptiveMetadata.title;
                return isAscending
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            });
        } else if (sort === "download") {
            sortedData.sort((a, b) => {
                const aValue = a.AdministrativeMetadata.download;
                const bValue = b.AdministrativeMetadata.download;
                return isAscending ? aValue - bValue : bValue - aValue;
            });
        } else if (sort === "createdAt") {
            sortedData.sort((a, b) => {
                const aValue = a.header.createdAt;
                const bValue = b.header.createdAt;
                return isAscending
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            });
        }
        return sortedData;
    };
    return (
        <>
            <PageTitle title={"Tri thức trong tầm tay"} />
            <CustomBreadcrumb />
            <div className='section-library' ref={listRef}>
                <div className='container'>
                    <div className='direction'>
                        <div className='filter-direction'>
                            <button
                                className='filter-toggle'
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <FontAwesomeIcon icon={faList} />
                            </button>
                        </div>
                        <div className='tools'>
                            <SearchBar isSmall={true} />
                            <SortDropdown
                                standards={standardSort}
                                sortFunction={handleSort}
                                selected={sort}
                                setSelected={setSort}
                                isAscending={isAscending}
                                setIsAscending={setIsAscending}
                            />
                        </div>
                    </div>
                </div>

                <div className='container flex-col'>
                    {pageData.length > 0 ? (
                        <div className='cards'>
                            {pageData.map((data, index) => (
                                <BookCard key={index} data={data} />
                            ))}
                        </div>
                    ) : (
                        <p>{"Không có tài liệu"}</p>
                    )}
                    <div className='card-pagination'>
                        <Pagination
                            data={books}
                            setPageData={setPageData}
                            scrollRef={listRef}
                        />
                    </div>
                </div>
            </div>
            <>
                <div
                    className={`filter-overlay ${isFilterOpen ? "active" : ""}`}
                    onClick={() => setIsFilterOpen(false)}
                ></div>
                <div className={`filter-modal ${isFilterOpen ? "active" : ""}`}>
                    <div className='filter-modal-header'>
                        <h5>Lọc tài liệu</h5>
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => setIsFilterOpen(false)}
                        />
                    </div>
                    <div className='filter-modal-body'>
                        {categories.map((cate, index) => (
                            <div key={index} className={`filter-link`}>
                                <a
                                    className={
                                        cate.name === category ? "active" : ""
                                    }
                                    href={`/library?category=${cate.name}`}
                                >
                                    {cate.name}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </>
    );
};
export default LibraryPage;
