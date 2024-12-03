import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./CustomBreadcrumb.css";

const CustomBreadcrumb = () => {
    const [prevs, setPrevs] = useState([]);
    const [active, setActive] = useState({});

    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes("/about")) {
            setPrevs([{ name: "Trang chủ", path: "/home" }]);
            setActive({ name: "Giới thiệu", path: "/about" });
        } else if (location.pathname.includes("/library")) {
            setPrevs([{ name: "Trang chủ", path: "/home" }]);
            setActive({ name: "Thư viện", path: "/library" });
        } else if (location.pathname.includes("/book")) {
            setPrevs([
                { name: "Trang chủ", path: "/home" },
                { name: "Thư viện", path: "/library" },
            ]);
            setActive({ name: "Tài liệu", path: "/book" });
        } else if (location.pathname.includes("/help")) {
            setPrevs([{ name: "Trang chủ", path: "/home" }]);
            setActive({ name: "Hỗ trợ", path: "/help" });
        } else if (location.pathname.includes("/upload")) {
            setPrevs([{ name: "Trang chủ", path: "/home" }]);
            setActive({ name: "Tặng tài liệu", path: "/upload" });
        } else if (location.pathname.includes("/request")) {
            setPrevs([{ name: "Trang chủ", path: "/home" }]);
            setActive({ name: "Yêu cầu", path: "/request" });
        } else if (location.pathname.includes("/profile")) {
            setPrevs([{ name: "Trang chủ", path: "/home" }]);
            setActive({ name: "Tài khoản", path: "/profile" });
        } else {
            setPrevs([{ name: "Trang chủ", path: "/home" }]);
            setActive({ name: "Giới thiệu sách", path: "/introduction" });
        }
    }, []);

    return (
        <div className='container'>
            <Breadcrumb>
                {prevs.map((p, i) => (
                    <BreadcrumbItem key={i}>
                        <Link to={p.path}>{p.name}</Link>
                    </BreadcrumbItem>
                ))}
                <BreadcrumbItem active>{active.name}</BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
};

export default CustomBreadcrumb;
