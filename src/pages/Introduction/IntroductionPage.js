import React, { useState, useRef } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import Introduction from "../../components/Introduction/Introduction";
import Pagination from "../../components/Pagination/Pagination";
import config from "../../config";

const IntroductionPage = () => {
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

    return (
        <>
            <PageTitle title={"Giới thiệu sách"} />
            <div className='section' ref={listRef}>
                <div className='container '>
                    <div className='book-introduction'>
                        {pageData.map((b, index) => (
                            <Introduction object={config.introductionObject} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='card-pagination'>
                <Pagination
                    data={books}
                    setPageData={setPageData}
                    scrollRef={listRef}
                />
            </div>
            {/* Tạo khoảng cách với footer */}
            <div className='section'></div>
        </>
    );
};

export default IntroductionPage;
