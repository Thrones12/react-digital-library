import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/histories`;
    const [data, setData] = useState();
    const [datas, setDatas] = useState();
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

    const handleClickRow = (id) => {
        const findData = datas.find((d) => d._id === id);
        setData(findData);
    };
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
                            {datas &&
                                datas.map((d, index) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleClickRow(d._id)}
                                    >
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
                </div>
            </div>
        </div>
    );
};

export default AdminUserPage;
