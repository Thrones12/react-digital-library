import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import { useFormik } from "formik";
import * as Yup from "yup";
import AdminPagination from "../../../components/Admin/Pagination/AdminPagination";

const AdminBookPage = () => {
    const API = `${Config.BASE_API_URL}/books`;
    const CATE_API = `${Config.BASE_API_URL}/categories`;
    const [data, setData] = useState();
    const [datas, setDatas] = useState();
    const [categories, setCategories] = useState();
    const [pageData, setPageData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(API);
                setDatas(res.data.data);

                const resC = await axios.get(CATE_API);
                setCategories(resC.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleClickRow = (id) => {
        const findData = datas.find((d) => d._id === id);
        console.log(findData);

        setData(findData);
    };

    const handleAdd = async () => {};
    const handleUpdate = async () => {};
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
            <div className='admin-header'>Quản lý tài liệu</div>
            <div className='admin-content'>
                <div className='col col-8'>
                    <button onClick={() => setData(null)}>Thêm</button>
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Tác giả</th>
                                <th>Thể loại</th>
                                <th>Loại tài liệu</th>
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
                                        <td>{d.DescriptiveMetadata.title}</td>
                                        <td>{d.DescriptiveMetadata.author}</td>
                                        <td>
                                            {
                                                d.DescriptiveMetadata.category
                                                    .name
                                            }
                                        </td>
                                        <td>{d.AdministrativeMetadata.type}</td>
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
                    Thông tin tài liệu
                    <form>
                        <label htmlFor='creator'>Người tạo</label>
                        <input
                            type='text'
                            name='creator'
                            value={data ? data.header.creator.fullName : ""}
                        />
                        <label htmlFor='barcode'>Mã</label>
                        <input
                            type='text'
                            name='barcode'
                            value={data ? data.DescriptiveMetadata.barcode : ""}
                        />
                        <label htmlFor='title'>Tên</label>
                        <input
                            type='text'
                            name='title'
                            value={data ? data.DescriptiveMetadata.title : ""}
                        />
                        <label htmlFor='author'>Tác giả</label>
                        <input
                            type='text'
                            name='author'
                            value={data ? data.DescriptiveMetadata.author : ""}
                        />
                        <label htmlFor='subAuthor'>Tác giả phụ</label>
                        <input
                            type='text'
                            name='subAuthor'
                            value={
                                data ? data.DescriptiveMetadata.subAuthor : ""
                            }
                        />
                        <label htmlFor='category'>Thể loại</label>
                        <select
                            name='category'
                            value={
                                data
                                    ? data.DescriptiveMetadata.category._id
                                    : ""
                            }
                        >
                            {categories &&
                                categories.map((cate) => (
                                    <option value={`${cate._id}`}>
                                        {cate.name}
                                    </option>
                                ))}
                        </select>

                        <label htmlFor='publisher'>Nhà xuất bản</label>
                        <input
                            type='text'
                            name='publisher'
                            value={
                                data ? data.DescriptiveMetadata.publisher : ""
                            }
                        />
                        <label htmlFor='publicationYear'>Năm xuất bản</label>
                        <input
                            type='text'
                            name='publicationYear'
                            value={
                                data
                                    ? data.DescriptiveMetadata.publicationYear
                                    : ""
                            }
                        />
                        <label htmlFor='language'>Ngôn ngữ</label>
                        <input
                            type='text'
                            name='language'
                            value={
                                data ? data.DescriptiveMetadata.language : ""
                            }
                        />

                        <label htmlFor='size'>Kích thước</label>
                        <input
                            type='text'
                            name='size'
                            value={data ? data.AdministrativeMetadata.size : ""}
                        />
                        <label htmlFor='copyright'>Bản quyền</label>
                        <input
                            type='text'
                            name='copyright'
                            value={
                                data
                                    ? data.AdministrativeMetadata.copyright
                                    : ""
                            }
                        />
                        <label htmlFor='source'>Nguồn</label>
                        <input
                            type='text'
                            name='source'
                            value={
                                data ? data.AdministrativeMetadata.source : ""
                            }
                        />

                        <label htmlFor='isAvailable'>Cho phép tải</label>
                        <select
                            name='isAvailable'
                            value={
                                data
                                    ? data.AdministrativeMetadata.isAvailable
                                    : ""
                            }
                        >
                            <option value={true}>Cho phép</option>
                            <option value={false} selected>
                                Hạn chế
                            </option>
                        </select>

                        <label htmlFor='hasPrivilege'>Quyền tải</label>
                        <select
                            name='hasPrivilege'
                            value={
                                data
                                    ? data.AdministrativeMetadata.hasPrivilege
                                    : ""
                            }
                        >
                            <option value={1}>Admin</option>
                            <option value={0} selected>
                                User
                            </option>
                        </select>

                        <label htmlFor='download'>Số lượt tải</label>
                        <input
                            type='text'
                            name='download'
                            value={
                                data ? data.AdministrativeMetadata.download : ""
                            }
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

export default AdminBookPage;
