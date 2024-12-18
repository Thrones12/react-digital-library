import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NotiUtils from "../../../utils/NotiUtils";
import "./Sidebar.css";

const Sidebar = () => {
    const location = useLocation();
    const [active, setActive] = useState();
    useEffect(() => {
        let temp = location.pathname.split("/").pop();
        if (temp === "admin") {
            setActive("user");
        } else {
            setActive(temp);
        }
    }, [location]);
    return (
        <div className='sidebar'>
            <div className='sidebar-header'>
                <button
                    onClick={() => {
                        NotiUtils.infoWithDirection({
                            text: "Bạn có muốn đăng xuất?",
                            confirmText: "Đăng xuất",
                            func: async () => {
                                localStorage.removeItem("userInfo");
                                window.location.href = "/home";
                            },
                        });
                    }}
                >
                    Đăng xuất
                </button>
            </div>
            <div className='sidebar-nav'>
                <div className='nav-link'>
                    <Link
                        className={active === "user" ? "active" : ""}
                        to='/admin/user'
                    >
                        Người dùng
                    </Link>
                </div>
                <div className='nav-link'>
                    <Link
                        className={active === "book" ? "active" : ""}
                        to='/admin/book'
                    >
                        Tài liệu
                    </Link>
                </div>
                <div className='nav-link'>
                    <Link
                        className={active === "category" ? "active" : ""}
                        to='/admin/category'
                    >
                        Danh mục
                    </Link>
                </div>
                <div className='nav-link'>
                    <Link
                        className={active === "history" ? "active" : ""}
                        to='/admin/history'
                    >
                        Lịch sử tải
                    </Link>
                </div>
                <div className='nav-link'>
                    <Link
                        className={active === "introduction" ? "active" : ""}
                        to='/admin/introduction'
                    >
                        Giới thiệu sách
                    </Link>
                </div>
                <div className='nav-link'>
                    <Link
                        className={active === "request" ? "active" : ""}
                        to='/admin/request'
                    >
                        Yêu cầu
                    </Link>
                </div>
                <div className='nav-link'>
                    <Link
                        className={active === "review" ? "active" : ""}
                        to='/admin/review'
                    >
                        Đánh giá
                    </Link>
                </div>
                <div className='nav-link'>
                    <Link
                        className={active === "support" ? "active" : ""}
                        to='/admin/support'
                    >
                        Hỗ trợ
                    </Link>
                </div>
                <div className='nav-link'>
                    <Link
                        className={active === "upload" ? "active" : ""}
                        to='/admin/upload'
                    >
                        Tài liệu được gửi
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
