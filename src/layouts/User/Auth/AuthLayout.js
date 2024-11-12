import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className='wrapper'>
            <Outlet />
        </div>
    );
};

export default AuthLayout;
