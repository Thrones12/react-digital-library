import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import AdminPagination from "../../../components/Admin/Pagination/AdminPagination";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/histories`;
    const [datas, setDatas] = useState();
    const [pageData, setPageData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API);
                setDatas(res.data.data);
                console.log(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='admin-container'>
            <div className='admin-header'>Lịch sử tải sách</div>
            <div className='admin-content'>
                <div className='col col-12'>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th>Mã sách</th>
                                <th>Tên sách</th>
                                <th>Tác giả</th>
                                <th>Thể loại</th>
                                <th>Ngày tải</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pageData &&
                                pageData.map((d, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{d.user.fullName}</td>
                                        <td>{d.user.email}</td>
                                        <td>
                                            {d.book.DescriptiveMetadata.barcode}
                                        </td>
                                        <td>
                                            {d.book.DescriptiveMetadata.title}
                                        </td>
                                        <td>
                                            {d.book.DescriptiveMetadata.author}
                                        </td>
                                        <td>
                                            {
                                                d.book.DescriptiveMetadata
                                                    .category.name
                                            }
                                        </td>
                                        <td>{d.downloadAt}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    {datas && (
                        <AdminPagination
                            data={datas}
                            setPageData={setPageData}
                            customLimit={30}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUserPage;
