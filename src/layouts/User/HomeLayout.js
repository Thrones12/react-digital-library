import React from "react";
import { Outlet } from "react-router-dom";
import "./HomeLayout.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const HomeLayout = () => {
    return (
        <div className='wrapper'>
            <Header />

            <Outlet />

            <Footer />
        </div>
    );
};

export default HomeLayout;
