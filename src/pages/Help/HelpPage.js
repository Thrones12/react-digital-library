import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import Config from "../../utils/Config";
import NotiUtils from "../../utils/NotiUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faPhone,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./HelpPage.css";

const HelpPage = () => {
    const API = `${Config.BASE_API_URL}/supports`;
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
        validateOnChange: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required(),
            subject: Yup.string().required(),
            message: Yup.string().required(),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await axios.post(`${API}`, {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    subject: values.subject,
                    message: values.message,
                });
                NotiUtils.success("Gửi tin nhắn thành công");
                resetForm();
            } catch (err) {
                NotiUtils.error("Gửi tin nhắn thất bại");
            }
        },
    });

    return (
        <>
            <PageTitle title={"Luôn sẵn sàng hỗ trợ"} />
            <CustomBreadcrumb />

            <div className='section-help'>
                <div className='container'>
                    <div className='help-content'>
                        <div className='col col-6'>
                            <h1>Liên Hệ Với Chúng Tôi</h1>
                            <div className='seperator'></div>
                            <p>
                                Nếu bạn có bất kỳ câu hỏi nào, yêu cầu hỗ trợ,
                                hoặc phản hồi, đừng ngần ngại liên hệ với chúng
                                tôi. Chúng tôi luôn sẵn sàng trợ giúp.
                            </p>

                            <div class='contact-info'>
                                <h3>Thông Tin Liên Hệ:</h3>
                                <p>
                                    <FontAwesomeIcon icon={faEnvelope} />{" "}
                                    support@example.com
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faPhone} />{" "}
                                    123-456-789
                                </p>
                                <p>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} /> Số
                                    123, Đường ABC, Quận XYZ, Thành phố Hồ Chí
                                    Minh
                                </p>
                            </div>

                            <div className='contact-social'>
                                <h3>Theo dõi chúng tôi trên:</h3>
                                <div className='socials-media'>
                                    <Link
                                        to='https://www.facebook.com/yourprofile'
                                        target='_blank'
                                        className='social-icon facebook'
                                    >
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </Link>
                                    <a
                                        href='https://www.instagram.com/yourprofile'
                                        target='_blank'
                                        className='social-icon instagram'
                                    >
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className='col col-6'>
                            <div className='contact-form'>
                                <h1>Bạn có thắc mắc nào không?</h1>
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

                                    <input
                                        type='text'
                                        id='subject'
                                        name='subject'
                                        placeholder='Tiêu đề *'
                                        required
                                        {...formik.getFieldProps("subject")}
                                    />

                                    <textarea
                                        rows={10}
                                        id='message'
                                        name='message'
                                        placeholder='Tin nhắn *'
                                        required
                                        {...formik.getFieldProps("message")}
                                    ></textarea>

                                    <button type='submit'>Gửi tin nhắn </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HelpPage;
