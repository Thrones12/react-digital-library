import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
    const nav = useNavigate();
    const [user, setUser] = useState();
    useEffect(() => {
        const checkRole = () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                setUser(userInfo.data);
                if (userInfo.expiryTime - Date.now() > 0) {
                    if (!userInfo || userInfo.data.role !== "Admin") {
                        // Chuyển hướng đến trang đăng nhập hoặc thông báo lỗi
                        nav("/auth/login");
                    }
                }
            } catch (err) {
                nav("/auth/login");
            }
        };
        checkRole();
    }, []);

    // Nếu user hợp lệ và role là admin, render nội dung
    return (
        <>
            {user && (
                <div className='admin'>
                    <Sidebar />
                    <Outlet />
                </div>
            )}
        </>
    );
};

export default AdminLayout;
