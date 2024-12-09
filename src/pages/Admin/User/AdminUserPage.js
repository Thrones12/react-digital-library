import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUserPage.css";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/users`;
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
            <div className='admin-header'>Quản lý người dùng</div>
            <div className='admin-content'>
                <div className='col col-8'>
                    <button onClick={() => setData(null)}>Thêm</button>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Trạng thái</th>
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
                                        <td>{d.fullName}</td>
                                        <td>{d.email}</td>
                                        <td>{d.status}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className='col col-4'>
                    Thông tin người dùng
                    <form>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            name='email'
                            value={data ? data.email : ""}
                        />
                        <label htmlFor='password'>Mật khẩu</label>
                        <input
                            type='password'
                            name='password'
                            value={data ? data.password : ""}
                        />
                        <label htmlFor='fullName'>Họ tên</label>
                        <input
                            type='text'
                            name='fullName'
                            value={data ? data.fullName : ""}
                        />
                        <label htmlFor='phone'>Số điện thoại</label>
                        <input
                            type='text'
                            name='phone'
                            value={data ? data.phone : ""}
                        />
                        <label htmlFor='email'>Quyền</label>
                        <select name='role' value={data ? data.role : ""}>
                            <option value='Admin'>Admin</option>
                            <option value='User' selected>
                                User
                            </option>
                        </select>
                        <label htmlFor='status'>Trạng thái</label>
                        <select name='status' value={data ? data.status : ""}>
                            <option value='Active' selected>
                                Active
                            </option>
                            <option value='Inactive'>Inactive</option>
                            <option value='Locked'>Locked</option>
                        </select>
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
