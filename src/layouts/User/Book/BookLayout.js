import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const BookLayout = () => {
    return (
        <div className='wrapper'>
            <Header />

            <div className='page-title'>
                <div className='background-image'>
                    <div className='container'>
                        <h2>TÀI LIỆU</h2>
                    </div>
                </div>
            </div>

            <Outlet />

            <Footer />
        </div>
    );
};

export default BookLayout;
