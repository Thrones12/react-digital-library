import React from "react";
import { Link } from "react-router-dom";
import "./Aside.css";

const Aside = () => {
    return (
        <div className='aside col col-2'>
            <div className='aside-title'>Danh mục sách</div>
            <div className='aside-link'>
                <Link className='active'>Khoa học</Link>
                <Link>Kinh tế</Link>
                <Link>Lịch sử</Link>
            </div>
        </div>
    );
};

export default Aside;
