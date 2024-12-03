import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
    useEffect(() => {
        const checkRole = () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                if (userInfo.expiryTime - Date.now() > 0) {
                    if (!userInfo.data || userInfo.data.role !== "admin") {
                        // Chuyển hướng đến trang đăng nhập hoặc thông báo lỗi
                        return <Navigate to='/auth/login' replace />;
                    }
                }
            } catch (err) {}
        };
        checkRole();
    }, []);

    // Nếu user hợp lệ và role là admin, render nội dung
    return <Outlet />;
};

export default AdminLayout;
