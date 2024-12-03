import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import Config from "../../utils/Config";
import NotiUtils from "../../utils/NotiUtils";
import "./UploadPage.css";

const UploadPage = () => {
    const API = `${Config.BASE_API_URL}/uploads`;
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
        } else {
            setFile("Chưa có tệp nào được chọn");
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
        },
        validateOnChange: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required(),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("email", values.email);
                formData.append("phone", values.phone);
                formData.append("file", file);

                const res = await axios.post(`${API}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Đặt Content-Type
                    },
                });
                NotiUtils.success("Gửi tài liệu thành công");
                resetForm();
            } catch (err) {
                NotiUtils.error("Gửi tài liệu thất bại");
            }
        },
    });
    return (
        <>
            <PageTitle title={"Gửi tặng tài liệu"} />
            <CustomBreadcrumb />

            <div className='section-upload'>
                <div className='container'>
                    <div className='upload-content'>
                        <div className='col col-6'>
                            <div className='thanks'>
                                <h1>Lời Cảm Ơn</h1>
                                <div className='seperator'></div>
                                <p>
                                    Chúng tôi xin chân thành cảm ơn bạn đã gửi
                                    tài liệu quý báu đến{" "}
                                    <strong>Thư viện Số</strong>. Đóng góp của
                                    bạn không chỉ giúp làm phong phú thêm kho
                                    tài nguyên của chúng tôi mà còn góp phần
                                    chia sẻ tri thức, hỗ trợ cộng đồng học tập
                                    và nghiên cứu.
                                </p>
                                <p>
                                    Đội ngũ Thư viện Số sẽ xem xét và sắp xếp
                                    tài liệu của bạn để đảm bảo rằng nó sẽ sớm
                                    đến với những người cần. Một lần nữa, xin
                                    cảm ơn bạn vì sự đóng góp ý nghĩa này!
                                </p>
                                <p>
                                    Trân trọng,
                                    <br />
                                    <strong>Thư viện Số</strong>
                                </p>
                            </div>
                        </div>
                        <div className='col col-6'>
                            <div class='upload-form'>
                                <h1>Biểu mẫu</h1>
                                <div className='seperator'></div>
                                <p>
                                    Sử dụng mẫu dưới đây để liên hệ với chúng
                                    tôi.
                                </p>
                                <form onSubmit={formik.handleSubmit}>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        placeholder='Tên người gửi *'
                                        required
                                        {...formik.getFieldProps("name")}
                                    />
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='Email liên hệ *'
                                        required
                                        {...formik.getFieldProps("email")}
                                    />
                                    <input
                                        type='text'
                                        id='phone'
                                        name='phone'
                                        placeholder='Số điện thoại'
                                        {...formik.getFieldProps("phone")}
                                    />

                                    <div className='file-upload'>
                                        <label
                                            htmlFor='file-input'
                                            className='custom-file-upload'
                                        >
                                            Tải lên
                                        </label>
                                        <input
                                            type='file'
                                            id='file-input'
                                            name='file-input'
                                            onChange={handleFileChange}
                                            style={{ display: "none" }} // Ẩn input file
                                            required
                                        />
                                        <span id='file-name'>
                                            {file
                                                ? file.name
                                                : "Chưa có tệp nào"}
                                        </span>
                                    </div>

                                    <textarea
                                        rows={10}
                                        id='message'
                                        name='message'
                                        placeholder='Tin nhắn'
                                        required
                                    ></textarea>
                                    <button type='submit'>Gửi tài liệu </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadPage;
