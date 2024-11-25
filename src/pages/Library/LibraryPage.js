import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import BookCard from "../../components/BookCard/BookCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Pagination from "../../components/Pagination/Pagination";
import "./LibraryPage.css";

const LibraryPage = () => {
    const [books, setBooks] = useState(() => {
        const objects = [];
        for (let i = 0; i < 20; i++) {
            objects.push({
                name: "Luân hồi lạc viên",
                createdAt: "2015-11-11",
            });
        }
        return objects;
    });
    const [pageData, setPageData] = useState([]);
    const listRef = useRef(null);

    const standardSort = [
        { name: "Họ tên", type: "name" },
        { name: "Ngày tạo", type: "createdAt" },
    ];
    return (
        <>
            <PageTitle title={"Tri thức trong tầm tay"} />

            <div className='section-library' ref={listRef}>
                <div className='container'>
                    <div className='direction'>
                        <div className='breadcrumb'>
                            <Link to='/home'>Trang chủ</Link>
                            <p>{" > "}</p>
                            <Link to='/library'>Thư viện</Link>
                        </div>

                        <div className='tools'>
                            <SearchBar isSmall={true} />
                            <SortDropdown
                                standards={standardSort}
                                data={books}
                                setValidData={setBooks}
                            />
                            {/* <div className='search'>
                                <input
                                    type='text'
                                    className='tool-search'
                                    placeholder='Tìm kiếm'
                                />
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className='container flex-col'>
                    <div className='cards'>
                        {pageData.map((b, index) => (
                            <BookCard
                                key={index}
                                link={`/book/${b}`}
                                title={"Luân hồi lạc viên"}
                                author={"Author"}
                                cate={"Cate"}
                                img={"/images/book-item.jpg"}
                            />
                        ))}
                        {/* <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link> */}
                    </div>
                    <div className='card-pagination'>
                        <Pagination
                            data={books}
                            setPageData={setPageData}
                            scrollRef={listRef}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LibraryPage;
