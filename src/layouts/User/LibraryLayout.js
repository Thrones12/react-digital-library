import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./LibraryLayout.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Aside from "../../components/Aside/Aside";

const LibraryLayout = () => {
    return (
        <div className='wrapper'>
            <Header />

            <div className='section-title'>
                <div className='background-image'>
                    <div className='container'>
                        <h2>THƯ VIỆN</h2>
                    </div>
                </div>
            </div>

            <div className='container' style={{ marginBottom: "50px" }}>
                <Aside />

                <Outlet />
            </div>

            <Footer />
        </div>
    );
};

export default LibraryLayout;
