import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

const BookLayout = () => {
    return (
        <div className='wrapper'>
            <Header />

            <Outlet />

            <Footer />
        </div>
    );
};

export default BookLayout;
