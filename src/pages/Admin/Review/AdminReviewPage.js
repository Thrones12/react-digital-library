import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminPagination from "../../../components/Admin/Pagination/AdminPagination";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/reviews`;
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
            user: data ? data.user._id : "",
            book: data ? data.book._id : "",
            rating: data ? data.rating : "",
            content: data ? data.content : "",
        },
        validateOnChange: Yup.object({
            user: Yup.string(),
            book: Yup.string(),
            rating: Yup.string(),
            content: Yup.string(),
        }),
    });
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${API}/${data._id}`);
            const resetData = await axios.get(API);
            setDatas(resetData.data.data);
            NotiUtils.success("Xóa thành công");
        } catch (err) {
            NotiUtils.error("Xóa thất bại");
        }
    };
    return (
        <div className='admin-container'>
            <div className='admin-header'>Quản lý đánh giá</div>
            <div className='admin-content'>
                <div className='col col-8'>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Người dùng</th>
                                <th>Tài liệu</th>
                                <th>Tác giả</th>
                                <th>Sao</th>
                                <th>Đánh giá</th>
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
                                        <td>{d.user.fullName}</td>
                                        <td>
                                            {d.book.DescriptiveMetadata.title}
                                        </td>
                                        <td>
                                            {d.book.DescriptiveMetadata.author}
                                        </td>
                                        <td>{d.rating}</td>
                                        <td>{d.content}</td>
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
                        <label htmlFor='user'>Người dùng</label>
                        <input
                            type='text'
                            name='user'
                            {...formik.getFieldProps("user")}
                            disabled
                        />

                        <label htmlFor='book'>Tài liệu</label>
                        <input
                            type='text'
                            name='book'
                            {...formik.getFieldProps("book")}
                            disabled
                        />

                        <label htmlFor='rating'>Sao</label>
                        <input
                            type='text'
                            name='rating'
                            {...formik.getFieldProps("rating")}
                            disabled
                        />

                        <label htmlFor='content'>Đánh giá</label>
                        <textarea
                            rows='10'
                            name='content'
                            {...formik.getFieldProps("content")}
                            disabled
                        />
                    </form>
                    {data ? (
                        <div className='admin-btn-controls'>
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
