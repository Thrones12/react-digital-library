import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminPagination from "../../../components/Admin/Pagination/AdminPagination";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/uploads`;
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
            name: data ? data.name : "",
            email: data ? data.email : "",
            phone: data ? data.phone : "",
            file: data && data.file ? data.file : "",
            status: data ? data.status : "Pending",
        },
        validateOnChange: Yup.object({
            name: Yup.string(),
            email: Yup.string(),
            file: Yup.string(),
            phone: Yup.string(),
            status: Yup.string(),
        }),
    });
    const handleUpdate = async () => {
        try {
            const res = await axios.put(`${API}/${data._id}`, formik.values);
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
            <div className='admin-header'>Quản lý tài liệu được gửi</div>
            <div className='admin-content'>
                <div className='col col-8'>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên người gửi</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Tên file</th>
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
                                        <td>{d.name}</td>
                                        <td>{d.email}</td>
                                        <td>{d.phone}</td>
                                        <td>{d.file}</td>
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
                    Thông tin tài liệu được gửi
                    <form>
                        <label htmlFor='name'>Tên người gửi</label>
                        <input
                            type='text'
                            name='name'
                            {...formik.getFieldProps("name")}
                            disabled
                        />

                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            name='email'
                            {...formik.getFieldProps("email")}
                            disabled
                        />

                        <label htmlFor='phone'>Số điện thoại</label>
                        <input
                            type='text'
                            name='phone'
                            {...formik.getFieldProps("phone")}
                            disabled
                        />

                        <label htmlFor='file'>Đường dẫn</label>
                        <input
                            type='text'
                            name='file'
                            {...formik.getFieldProps("file")}
                            disabled
                        />

                        <label htmlFor='status'>Trạng thái</label>
                        <select
                            name='status'
                            {...formik.getFieldProps("status")}
                        >
                            <option value='Pending'>Pending</option>
                            <option value='Approved'>Approved</option>
                            <option value='Canceled'>Canceled</option>
                        </select>
                    </form>
                    {data ? (
                        <div className='admin-btn-controls'>
                            <button onClick={handleUpdate}>Sửa</button>
                            <button onClick={handleDelete}>Xóa</button>
                        </div>
                    ) : (
                        <div className='admin-btn-controls'></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUserPage;
