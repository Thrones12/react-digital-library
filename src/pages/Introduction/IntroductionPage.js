import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import PageTitle from "../../components/PageTitle/PageTitle";
import Introduction from "../../components/Introduction/Introduction";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import Pagination from "../../components/Pagination/Pagination";
import Config from "../../utils/Config";

const IntroductionPage = () => {
    const API = `${Config.BASE_API_URL}`;
    const [introductions, setIntroductions] = useState([]);
    const [pageData, setPageData] = useState([]);
    const listRef = useRef(null);

    //Fetch introduction
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${API}/introductions`);
            setIntroductions(res.data.data);
            setPageData(res.data.data.slice(0, Config.LIMIT));
        };
        fetchData();
    }, []);

    return (
        <>
            <PageTitle title={"Giới thiệu sách"} /> <CustomBreadcrumb />
            <div className='section' ref={listRef}>
                <div className='container '>
                    <div className='book-introduction'>
                        {pageData.map((i, index) => (
                            <Introduction key={index} object={i} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='card-pagination'>
                <Pagination
                    data={introductions}
                    setPageData={setPageData}
                    scrollRef={listRef}
                    isIntro={true}
                />
            </div>
            {/* Tạo khoảng cách với footer */}
            <div className='section'></div>
        </>
    );
};

export default IntroductionPage;
