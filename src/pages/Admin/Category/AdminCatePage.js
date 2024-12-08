import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/categories`;
    const [data, setData] = useState();
    const [datas, setDatas] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API);
                setDatas(res.data.data);
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
            <div className='admin-header'>Quản lý danh mục</div>
            <div className='admin-content'>
                <div className='col col-8'>
                    <button onClick={() => setData(null)}>Thêm</button>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Lượt tải</th>
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
                                        <td>{d.name}</td>
                                        <td>{d.download}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className='col col-4'>
                    Thông tin người dùng
                    <form>
                        <label htmlFor='name'>Tên danh mục</label>
                        <input
                            type='text'
                            name='name'
                            value={data ? data.name : ""}
                        />
                        {data ? (
                            <div className='admin-btn-controls'>
                                <button>Sửa</button>
                                <button>Xóa</button>
                            </div>
                        ) : (
                            <div className='admin-btn-controls'>
                                <button>Thêm</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminUserPage;
