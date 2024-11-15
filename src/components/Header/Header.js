import React from "react";
import { Link, useLocation } from "react-router-dom";
import ButtonToRight from "../ButtonToRight/ButtonToRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";

const Header = () => {
    const location = useLocation();
    const pathDes = location.pathname.split("/").pop();

    return (
        <header>
            <div className='container'>
                <div className='header-logo'>
                    <Link to='/home'>
                        <img src='/images/logo.png' alt='logo' />
                    </Link>
                </div>
                <div className='header-nav'>
                    <Link
                        to='/home'
                        className={
                            pathDes === "home" || pathDes === "" ? "active" : ""
                        }
                    >
                        <img src='/images/icon-home.png' alt='icon-home' />
                        <p>Trang chủ</p>
                    </Link>
                    <Link
                        to='/about'
                        className={pathDes === "about" ? "active" : ""}
                    >
                        <p>Giới thiệu</p>
                    </Link>
                    <Link
                        to='/library'
                        className={pathDes === "library" ? "active" : ""}
                    >
                        <p>Thư viện</p>
                    </Link>
                    <Link
                        to='/help'
                        className={pathDes === "help" ? "active" : ""}
                    >
                        <p>Hỗ trợ</p>
                    </Link>
                    <Link
                        to='/upload'
                        className={pathDes === "upload" ? "active" : ""}
                    >
                        <p>Tặng tài liệu</p>
                    </Link>
                    <Link
                        to='/request'
                        className={pathDes === "request" ? "active" : ""}
                    >
                        <p>Yêu cầu</p>
                    </Link>
                </div>
                <div className='header-controls'>
                    <ButtonToRight link={"/auth/login"} text={"Đăng nhập"} />
                </div>
            </div>
        </header>
    );
};

export default Header;
