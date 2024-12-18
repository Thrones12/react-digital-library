import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminUserPage.css";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminPagination from "../../../components/Admin/Pagination/AdminPagination";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/users`;
    const [data, setData] = useState();
    const [datas, setDatas] = useState();
    const [pageData, setPageData] = useState();
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: data ? data.email : "",
            password: data ? data.password : "",
            profilePicture: data ? data.profilePicture : "",
            fullName: data ? data.fullName : "",
            phone: data ? data.phone : "",
            role: data ? data.role : "User",
            status: data ? data.status : "Active",
            otpVertify: data ? data.otpVertify : "",
            privilege: data ? data.privilege : "",
        },
        validateOnChange: Yup.object({
            email: Yup.string(),
            password: Yup.string(),
            profilePicture: Yup.string(),
            fullName: Yup.string(),
            phone: Yup.string(),
            role: Yup.string(),
            status: Yup.string(),
            otpVertify: Yup.string(),
            privilege: Yup.string(),
        }),
    });
    const handleAdd = async () => {
        try {
            const res = await axios.post(API, formik.values);
            const resetData = await axios.get(API);
            setDatas(resetData.data.data);
            NotiUtils.success("Thêm thành công");
        } catch (err) {
            NotiUtils.error("Thêm thất bại");
        }
    };
    const handleUpdate = async () => {
        try {
            const res = await axios.put(API, formik.values);
            const resetData = await axios.get(API);
            setDatas(resetData.data.data);
            NotiUtils.success("Sửa thành công");
        } catch (err) {
            NotiUtils.error("Sửa thất bại");
        }
    };
    const handleDelete = async () => {
        NotiUtils.infoWithDirection({
            text: "Bạn có chắc chắn muốn xóa?",
            func: async () => {
                try {
                    const res = await axios.delete(`${API}/${data._id}`);
                    const resetData = await axios.get(API);
                    setDatas(resetData.data.data);
                    NotiUtils.success("Xóa thành công");
                } catch (err) {
                    NotiUtils.error("Xóa thất bại");
                }
            },
        });
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
                            {pageData &&
                                pageData.map((d, index) => (
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
                    {datas && (
                        <AdminPagination
                            data={datas}
                            setPageData={setPageData}
                        />
                    )}
                </div>
                <div className='col col-4'>
                    Thông tin người dùng
                    <form>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            name='email'
                            {...formik.getFieldProps("email")}
                        />

                        <label htmlFor='password'>Mật khẩu</label>
                        <input
                            type='password'
                            name='password'
                            {...formik.getFieldProps("password")}
                        />

                        <label htmlFor='fullName'>Họ tên</label>
                        <input
                            type='text'
                            name='fullName'
                            {...formik.getFieldProps("fullName")}
                        />

                        <label htmlFor='phone'>Số điện thoại</label>
                        <input
                            type='text'
                            name='phone'
                            {...formik.getFieldProps("phone")}
                        />

                        <label htmlFor='role'>Quyền</label>
                        <select name='role' {...formik.getFieldProps("role")}>
                            <option value='Admin'>Admin</option>
                            <option value='User'>User</option>
                        </select>

                        <label htmlFor='status'>Trạng thái</label>
                        <select
                            name='status'
                            {...formik.getFieldProps("status")}
                        >
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                            <option value='Locked'>Locked</option>
                        </select>

                        <label htmlFor='otpVertify'>Mã xác thực</label>
                        <input
                            type='text'
                            name='otpVertify'
                            {...formik.getFieldProps("otpVertify")}
                        />

                        <label htmlFor='privilege'>Quyền tải sách</label>
                        <input
                            type='text'
                            name='privilege'
                            {...formik.getFieldProps("privilege")}
                        />
                    </form>
                    {data ? (
                        <div className='admin-btn-controls'>
                            <button onClick={handleUpdate}>Sửa</button>
                            <button onClick={handleDelete}>Xóa</button>
                        </div>
                    ) : (
                        <div className='admin-btn-controls'>
                            <button onClick={handleAdd}>Thêm</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUserPage;
