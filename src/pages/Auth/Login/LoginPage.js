import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import "./LoginPage.css";

const LoginPage = () => {
    const API = `${Config.BASE_API_URL}/auth`;
    const nav = useNavigate();
    const [active, setActive] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnChange: Yup.object({
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${API}/login`, {
                    email: values.email,
                    password: values.password,
                });
                NotiUtils.success("Đăng nhập thành công");

                // Lưu thông tin user vào localStorage
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify({
                        data: res.data.data,
                        expiryTime: rememberMe
                            ? Date.now() + 30 * 24 * 60 * 60 * 1000 // Remember me thì lưu 30 ngày
                            : Date.now() + 24 * 60 * 60 * 1000, // Không thì lưu 1 ngày
                    })
                );

                setTimeout(() => {
                    if (res.data.data.role === "User") {
                        nav("/home");
                    } else {
                        nav("/admin");
                    }
                }, 1500);
            } catch (err) {
                if (err.status === 403) {
                    NotiUtils.infoWithDirection({
                        text: "Tài khoản của bạn chưa được kích hoạt",
                        confirmText: "Kích hoạt",
                        func: async () => {
                            try {
                                const res = await axios.post(
                                    `${API}/send-otp`,
                                    {
                                        email: values.email,
                                    }
                                );
                                nav("/auth/vertify", {
                                    state: { email: values.email },
                                });
                            } catch (err) {
                                NotiUtils.error("Gửi mail không thành công");
                            }
                        },
                    });
                } else if (err.status === 423) {
                    NotiUtils.error("Tài khoản đã bị khóa");
                } else if (err.status === 401) {
                    NotiUtils.error("Mật khẩu không đúng");
                } else if (err.status === 404) {
                    NotiUtils.error("Tài khoản không tồn tại");
                } else {
                    console.log(err);
                }
            }
        },
    });

    const formikRegister = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
        },
        validateOnChange: Yup.object({
            fullName: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post(`${API}/register`, {
                    fullName: values.fullName,
                    email: values.email,
                    password: values.password,
                });
                try {
                    const res = await axios.post(`${API}/send-otp`, {
                        email: values.email,
                    });
                    nav("/auth/vertify", {
                        state: { email: values.email },
                    });
                } catch (err) {
                    NotiUtils.error("Gửi mail không thành công");
                }
            } catch (err) {
                if (err.status === 409) {
                    NotiUtils.error("Email đã được đăng ký");
                } else {
                    NotiUtils.error("Dữ liệu không hợp lệ");
                }
            }
        },
    });

    return (
        <div className='login-page'>
            <div className='login-page-overlay'></div>
            <div className={`container ${active ? "right-panel-active" : ""}`}>
                <Link to='/home' className='back-icon'>
                    <FontAwesomeIcon icon={faReply} />
                </Link>
                <div className='form-container register-container'>
                    <form onSubmit={formikRegister.handleSubmit}>
                        <h1>Đăng ký</h1>
                        <input
                            name='fullName'
                            type='text'
                            placeholder='Họ tên'
                            {...formikRegister.getFieldProps("fullName")}
                        />
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            {...formikRegister.getFieldProps("email")}
                        />
                        <input
                            name='password'
                            type='password'
                            placeholder='Mật khẩu'
                            {...formikRegister.getFieldProps("password")}
                        />
                        <button type='submit'>Xác nhận</button>
                    </form>
                </div>

                <div className='form-container login-container'>
                    <form onSubmit={formikLogin.handleSubmit}>
                        <h1>Đăng nhập</h1>
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            {...formikLogin.getFieldProps("email")}
                        />
                        <input
                            name='password'
                            type='password'
                            placeholder='Mật khẩu'
                            {...formikLogin.getFieldProps("password")}
                        />
                        <div className='content'>
                            <div className='checkbox'>
                                <input
                                    type='checkbox'
                                    name='remenber-me'
                                    id='remenber-me'
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label htmlFor='Remember me'>Ghi nhớ tôi</label>
                            </div>
                            <div className='pass-link'>
                                <Link to='/auth/forgot'>Quên mật khẩu?</Link>
                            </div>
                        </div>
                        <button type='submit'>Xác nhận</button>
                    </form>
                </div>

                <div className='overlay-container'>
                    <div className='overlay'>
                        <div className='overlay-panel overlay-left'>
                            <h1 className='title'>
                                Xin chào, <br /> Bạn tôi
                            </h1>
                            <p> </p>
                            <button
                                className='ghost'
                                id='login'
                                onClick={() => setActive(false)}
                            >
                                Đăng nhập
                            </button>
                        </div>
                        <div className='overlay-panel overlay-right'>
                            <h1 className='title'>
                                Bắt đầu <br /> hành trình
                            </h1>
                            <p> </p>
                            <button
                                className='ghost'
                                id='register'
                                onClick={() => setActive(true)}
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
