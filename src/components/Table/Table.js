import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Table.css";

const Table = ({ ids, data, theads, handleDownload }) => {
    useEffect(() => {
        console.log(data);
    }, [ids]);
    return (
        <table className='table-custom'>
            <thead>
                <tr>{theads && theads.map((h, i) => <th key={i}>{h}</th>)}</tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? (
                    data.map((d, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            {Object.values(d).map((value, index) =>
                                value.includes("/") ? (
                                    <td key={index}>
                                        <Link
                                            to='#'
                                            onClick={(e) =>
                                                handleDownload(e, value, ids[i])
                                            } // Pass `value` explicitly
                                        >
                                            Tải xuống
                                        </Link>
                                    </td>
                                ) : (
                                    <td key={index}>{value}</td>
                                )
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6}>Không có dữ liệu</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
