import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminPagination.css";

const AdminPagination = ({ data, setPageData, customLimit }) => {
    const [page, setPage] = useState(1);
    const [pageRange, setPageRange] = useState([]);
    const [pageTotal, setPageTotal] = useState(1);
    const LIMIT = customLimit ? customLimit : 10;

    useEffect(() => {
        const pageTotal = Math.ceil(data.length / LIMIT);

        setPageTotal(pageTotal);

        if (page >= 1 && page <= 3) {
            setPageRange(Array.from({ length: pageTotal }, (v, i) => i + 1));
        } else if (page >= pageTotal - 2 && page <= pageTotal) {
            const arr = [];
            for (let i = pageTotal - 5; i <= pageTotal; i++) {
                if (i > 0) arr.push(i);
            }
            setPageRange(arr);
        } else {
            setPageRange([page - 2, page - 1, page, page + 1, page + 2]);
        }
        setPage(1);
        setPageData(data.slice(0, LIMIT));
    }, [data]);

    const handlePageChange = (page) => {
        setPage(page);
        const startIndex = (page - 1) * LIMIT;
        const endIndex = startIndex + LIMIT;

        setPageData(data.slice(startIndex, endIndex));
    };

    return (
        <div className='admin-pagination'>
            <button
                disabled={page === 1}
                className='pag-btn'
                onClick={() => {
                    handlePageChange(page - 1);
                }}
            >
                <FontAwesomeIcon icon={faChevronLeft} className='fa-xs' />
            </button>

            {pageRange.map((p, index) => (
                <button
                    key={index}
                    className={`pag-btn ${p === page ? "active" : ""}`}
                    onClick={() => {
                        handlePageChange(p);
                    }}
                >
                    {p}
                </button>
            ))}
            <button
                disabled={page === pageTotal}
                className='pag-btn'
                onClick={() => {
                    handlePageChange(page + 1);
                }}
            >
                <FontAwesomeIcon icon={faChevronRight} className='fa-xs' />
            </button>
        </div>
    );
};

export default AdminPagination;
