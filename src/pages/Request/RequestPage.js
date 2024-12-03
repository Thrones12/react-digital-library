import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import Config from "../../utils/Config";
import NotiUtils from "../../utils/NotiUtils";
import "./RequestPage.css";

const RequestPage = () => {
    const API = `${Config.BASE_API_URL}/requests`;
    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            category: "",
            publisher: "",
            reason: "",
        },
        validateOnChange: Yup.object({
            title: Yup.string().required(),
            author: Yup.string().required(),
            reason: Yup.string().required(),
        }),
        onSubmit: async (values, { resetForm }) => {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (userInfo) {
                try {
                    const res = await axios.post(`${API}`, {
                        user: userInfo.data,
                        title: values.title,
                        author: values.author,
                        category: values.category,
                        publisher: values.publisher,
                        reason: values.reason,
                    });
                    NotiUtils.success("Gửi yêu cầu thành công");
                    resetForm();
                } catch (err) {
                    if (err.status === 409) {
                        NotiUtils.info("Yêu cầu này đã được gửi trước đó");
                    } else {
                        NotiUtils.error("Gửi yêu cầu thất bại");
                    }
                }
            } else {
                NotiUtils.info("Bạn cần đăng nhập để gửi yêu cầu");
            }
        },
    });
    return (
        <>
            <PageTitle title={"Yêu cầu sách mới"} /> <CustomBreadcrumb />
            <div className='section-request'>
                <div className='container'>
                    <div className='request-content'>
                        <div className='col col-6'>
                            <div className='thanks'>
                                <h1>Đề xuất tài liệu bạn cần</h1>
                                <div className='seperator'></div>
                                <p>
                                    Tại Thư viện số, chúng tôi luôn lắng nghe ý
                                    kiến đóng góp từ cộng đồng để mở rộng và cập
                                    nhật nguồn tài nguyên học thuật. Nếu bạn cần
                                    một tài liệu chưa có trong thư viện, hãy
                                    điền vào biểu mẫu bên dưới.
                                </p>
                                <p>
                                    Chúng tôi sẽ xem xét yêu cầu của bạn và cố
                                    gắng bổ sung tài liệu phù hợp trong thời
                                    gian sớm nhất. Hãy giúp chúng tôi làm phong
                                    phú hơn kho tri thức, vì một cộng đồng học
                                    tập phát triển!
                                </p>
                                <p>
                                    Trân trọng,
                                    <br />
                                    <strong>Thư viện Số</strong>
                                </p>
                            </div>
                        </div>
                        <div className='col col-6'>
                            <div className='request-form'>
                                <h1>Biểu mẫu yêu cầu</h1>
                                <div className='seperator'></div>
                                <p></p>
                                <form onSubmit={formik.handleSubmit}>
                                    <input
                                        type='text'
                                        id='title'
                                        name='title'
                                        placeholder='Tên tài liệu *'
                                        required
                                        {...formik.getFieldProps("title")}
                                    />
                                    <input
                                        type='text'
                                        id='author'
                                        name='author'
                                        placeholder='Tên tác giả *'
                                        required
                                        {...formik.getFieldProps("author")}
                                    />
                                    <input
                                        type='text'
                                        id='category'
                                        name='category'
                                        placeholder='Thể loại. Ví dụ: Công nghệ, Khoa học...'
                                        {...formik.getFieldProps("category")}
                                    />{" "}
                                    <input
                                        type='text'
                                        id='publisher'
                                        name='publisher'
                                        placeholder='Nhà xuất bản'
                                        {...formik.getFieldProps("publisher")}
                                    />
                                    <textarea
                                        id='reason'
                                        name='reason'
                                        placeholder='Hãy cho chúng tôi biết lý do bạn cần tài liệu này... '
                                        required
                                        {...formik.getFieldProps("reason")}
                                        rows='10'
                                    ></textarea>
                                    <button type='submit'>Gửi yêu cầu</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestPage;
