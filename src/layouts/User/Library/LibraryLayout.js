import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./LibraryLayout.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Aside from "../../../components/Aside/Aside";

const LibraryLayout = () => {
    return (
        <div className='wrapper'>
            <Header />

            <div className='page-title'>
                <div className='background-image'>
                    <div className='container'>
                        <h2>THƯ VIỆN</h2>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='direction'>
                    <div className='breadcrumb col col-2'>
                        <Link to='/home'>Trang chủ</Link>
                        <p>{" > "}</p>
                        <Link to='/library'>Thư viện</Link>
                    </div>

                    <div className='tools col col-10'>
                        <div className='search'>
                            <input
                                type='text'
                                className='tool-search'
                                placeholder='Tìm kiếm'
                            />
                        </div>
                        <div className='sort'>
                            <button>Sort</button>
                        </div>
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
