import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminPagination from "../../../components/Admin/Pagination/AdminPagination";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/categories`;
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
            download: data ? data.download : "",
            picture: data ? data.picture : "",
        },
        validateOnChange: Yup.object({
            name: Yup.string(),
            download: Yup.string(),
            picture: Yup.string(),
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
            const res = await axios.put(`${API}/${data._id}`, formik.values);
            const resetData = await axios.get(API);
            setDatas(resetData.data.data);
            NotiUtils.success("Sửa thành công");
        } catch (err) {
            NotiUtils.error("Sửa thất bại");
        }
    };
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
                            {pageData &&
                                pageData.map((d, index) => (
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
                    {datas && (
                        <AdminPagination
                            data={datas}
                            setPageData={setPageData}
                        />
                    )}
                </div>
                <div className='col col-4'>
                    Thông tin danh mục
                    <form>
                        <label htmlFor='name'>Tên danh mục</label>
                        <input
                            type='text'
                            name='name'
                            {...formik.getFieldProps("name")}
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
