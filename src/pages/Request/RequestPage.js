import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./RequestPage.css";

const RequestPage = () => {
    return (
        <>
            <PageTitle title={"Yêu cầu sách mới"} />
            <div className='section-request'>
                <div className='container'>Yêu cầu</div>
            </div>
        </>
    );
};

export default RequestPage;
