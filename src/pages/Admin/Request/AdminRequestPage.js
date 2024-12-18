import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminPagination from "../../../components/Admin/Pagination/AdminPagination";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/requests`;
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
            user: data ? data.user : "",
            title: data ? data.title : "",
            author: data ? data.author : "",
            category: data ? data.category : "",
            publisher: data ? data.publisher : "",
            reason: data ? data.reason : "",
            status: data ? data.status : "Pending",
        },
        validateOnChange: Yup.object({
            title: Yup.string(),
            author: Yup.string(),
            category: Yup.string(),
            publisher: Yup.string(),
            reason: Yup.string(),
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
            <div className='admin-header'>Quản lý yêu cầu</div>
            <div className='admin-content'>
                <div className='col col-8'>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Người dùng</th>
                                <th>Tiêu đề</th>
                                <th>Tác giả</th>
                                <th>NXB</th>
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
                                        <td>{d.user.fullName}</td>
                                        <td>{d.title}</td>
                                        <td>{d.author}</td>
                                        <td>{d.publisher}</td>
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
                    Thông tin yêu cầu
                    <form>
                        <label htmlFor='user'>Người dùng</label>
                        <input
                            type='text'
                            name='user'
                            {...formik.getFieldProps("user")}
                            disabled
                        />

                        <label htmlFor='title'>Tiêu đề</label>
                        <input
                            type='text'
                            name='title'
                            {...formik.getFieldProps("title")}
                            disabled
                        />

                        <label htmlFor='author'>Tác giả</label>
                        <input
                            type='text'
                            name='author'
                            {...formik.getFieldProps("author")}
                            disabled
                        />

                        <label htmlFor='category'>Thể loại</label>
                        <input
                            type='text'
                            name='category'
                            {...formik.getFieldProps("category")}
                            disabled
                        />

                        <label htmlFor='reason'>Lý do</label>
                        <textarea
                            name='reason'
                            rows='10'
                            {...formik.getFieldProps("reason")}
                            disabled
                        />

                        <label htmlFor='publisher'>Nhà xuất bản</label>
                        <input
                            type='text'
                            name='publisher'
                            {...formik.getFieldProps("publisher")}
                            disabled
                        />

                        <label htmlFor='status'>Trạng thái</label>
                        <select
                            name='status'
                            {...formik.getFieldProps("status")}
                        >
                            <option value='Pending'>Pending</option>
                            <option value='Approved'>Approved</option>
                            <option value='Rejected'>Rejected</option>
                            <option value='InProcess'>InProcess</option>
                            <option value='Completed'>Completed</option>
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
