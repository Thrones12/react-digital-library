import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminPagination from "../../../components/Admin/Pagination/AdminPagination";
import CustomEditor from "../../../components/CustomEditor/CustomEditor";

const AdminUserPage = () => {
    const API = `${Config.BASE_API_URL}/introductions`;
    const [data, setData] = useState();
    const [datas, setDatas] = useState();
    const [pageData, setPageData] = useState();
    const [user, setUser] = useState();
    const [editorContent, setEditorContent] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API);
                setDatas(res.data.data);
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                if (userInfo.expiryTime - Date.now() > 0) {
                    setUser(userInfo.data);
                }
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
            title: data ? data.title : "",
            path: data && data.resource.path ? data.resource.path : "",
        },
        validateOnChange: Yup.object({
            title: Yup.string(),
            path: Yup.string(),
        }),
    });
    const handleAdd = async () => {
        try {
            const res = await axios.post(API, {
                title: formik.values.title,
                author: user,
                resource: {
                    type: "Link",
                    path: formik.values.path,
                },
                content: editorContent,
            });
            const resetData = await axios.get(API);
            setDatas(resetData.data.data);
            NotiUtils.success("Thêm thành công");
        } catch (err) {
            NotiUtils.error("Thêm thất bại");
        }
    };
    const handleUpdate = async () => {
        try {
            const res = await axios.put(`${API}/${data._id}`, {
                title: formik.values.title,
                author: user,
                resource: {
                    type: "Link",
                    path: formik.values.path,
                },
                content: editorContent,
            });
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
            <div className='admin-header'>Quản lý giới thiệu sách</div>
            <div className='admin-content'>
                <div className='col col-4'>
                    <button onClick={() => setData(null)}>Thêm</button>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tiêu đề</th>
                                <th>Người tạo</th>
                                <th>Ngày tạo</th>
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
                                        <td>{d.title}</td>
                                        <td>{d.author.fullName}</td>
                                        <td>{d.createdAt}</td>
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
                <div className='col col-8'>
                    Nội dung giới thiệu
                    <form>
                        <label htmlFor='title'>Tiêu đề</label>
                        <input
                            type='text'
                            name='title'
                            {...formik.getFieldProps("title")}
                        />
                        <label htmlFor='path'>Đường dẫn</label>
                        <input
                            type='text'
                            name='path'
                            {...formik.getFieldProps("path")}
                        />
                        {data ? (
                            <CustomEditor
                                content={data.content}
                                onContentChange={setEditorContent}
                            />
                        ) : (
                            <CustomEditor
                                content={""}
                                onContentChange={setEditorContent}
                            />
                        )}
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
