import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header>
            <div className='container'>
                <div className='header-logo'>
                    <Link to='/home'>
                        <img src='/images/logo192.png' alt='logo' />
                        <h2>Digital Library</h2>
                    </Link>
                </div>
                <div className='header-nav'>
                    <div></div>
                    <Link to='/about'>
                        <img src='/images/nav-icon-1.jpg' alt='icon' />
                        <p>Giới thiệu</p>
                    </Link>
                    <Link to='/library'>
                        <img src='/images/nav-icon-2.jpg' alt='icon' />
                        <p>Thư viện</p>
                    </Link>
                    <Link to='/help'>
                        <img src='/images/nav-icon-3.jpg' alt='icon' />
                        <p>Trợ giúp</p>
                    </Link>
                    <Link to='/upload'>
                        <img src='/images/nav-icon-4.jpg' alt='icon' />
                        <p>Tặng tài liệu</p>
                    </Link>
                    <Link to='/request'>
                        <img src='/images/nav-icon-5.jpg' alt='icon' />
                        <p>Yêu cầu</p>
                    </Link>
                </div>
                <div className='header-controls'>
                    <Link className='header-login' to='/auth/login'>
                        <img src='/images/account.jpg' alt='icon' />
                        <p>Đăng nhập</p>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
