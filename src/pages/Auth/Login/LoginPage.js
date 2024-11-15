import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
    const [active, setActive] = useState(false);

    return (
        <div className='login-page'>
            <div className='login-page-overlay'></div>
            <div className={`container ${active ? "right-panel-active" : ""}`}>
                <Link to='/home' className='back-icon'>
                    <FontAwesomeIcon icon={faReply} />
                </Link>
                <div className='form-container register-container'>
                    <form>
                        <h1>Đăng ký</h1>
                        <input type='text' placeholder='Họ tên' />
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Mật khẩu' />
                        <button>Xác nhận</button>
                    </form>
                </div>

                <div className='form-container login-container'>
                    <form>
                        <h1>Đăng nhập</h1>
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Mật khẩu' />
                        <div className='content'>
                            <div className='checkbox'>
                                <input
                                    type='checkbox'
                                    name='checkbox'
                                    id='checkbox'
                                />
                                <label for='Remember me'>Ghi nhớ tôi</label>
                            </div>
                            <div className='pass-link'>
                                <Link to='/auth/forgot'>Quên mật khẩu?</Link>
                            </div>
                        </div>
                        <button>Xác nhận</button>
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
