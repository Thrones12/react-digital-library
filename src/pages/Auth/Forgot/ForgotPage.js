import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../../../utils/Config";
import NotiUtils from "../../../utils/NotiUtils";
import "./ForgotPage.css";

const ForgotPage = () => {
    const API = `${Config.BASE_API_URL}/auth`;
    const nav = useNavigate();
    const inputFieldRef = useRef(null);
    const [email, setEmail] = useState();
    const [active, setActive] = useState(false);
    const [inputOTP, setInputOTP] = useState(["", "", "", ""]);
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        if (inputFieldRef.current) {
            const inputElements =
                inputFieldRef.current.querySelectorAll("input");
            setInputs(inputElements);
        }
    }, []);

    const handleInputOTP = (e, index) => {
        setInputOTP((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = e.target.value.slice(-1);
            return newArray;
        });

        // Chuyển focus sang input tiếp theo nếu có
        if (index < inputs.length - 1 && e.target.value) {
            inputs[index + 1].focus();
        }

        // Chuyển focus sang input trước nếu xóa
        if (index > 0 && e.target.value == "") {
            inputs[index - 1].focus();
        }
    };

    const sendOTP = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(`${API}/send-otp`, {
                email: email,
            });
            NotiUtils.info("OTP đã được gửi lại, hãy kiểm tra và xác minh.");
            setActive(true);
        } catch (err) {
            NotiUtils.error("Gửi mail không thành công");
        }
    };

    const submitVertify = async (e) => {
        e.preventDefault();

        const res = await axios.get(
            `${Config.BASE_API_URL}/users/email/${email}`
        );
        const user = res.data.data;

        if (user.otpVertify === inputOTP.join("")) {
            const resUpdate = await axios.put(`${API}/forgot`, {
                user,
            });
            console.log(resUpdate);

            NotiUtils.success("Mật khẩu mới đã được gửi vào email");
            setTimeout(() => {
                nav("/auth/login");
            }, 1500);
        } else {
            NotiUtils.error("Xác minh thất bại");
        }
    };

    return (
        <div className='forgot-page'>
            <div className='container'>
                <div className={`flip-card ${active ? "active" : ""}`}>
                    <div className='flip-card-inner'>
                        <div className='flip-card-front'>
                            <div className='flip-card-front-header'></div>
                            <h3>Quên mật khẩu</h3>
                            <p>
                                Nhập Email của tài khoản cần tìm lại mật khẩu.
                            </p>
                            <form>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    className='active'
                                    onClick={(e) => sendOTP(e)}
                                >
                                    Xác nhận
                                </button>
                            </form>

                            <p>
                                Quay lại đăng nhập?{" "}
                                <span>
                                    <Link to='/auth/login'>Quay lại</Link>
                                </span>
                            </p>
                        </div>

                        <div className='flip-card-back'>
                            <div className='flip-card-back-header'></div>
                            <h3>Enter OTP</h3>
                            <p>OTP đã được gửi qua Email</p>
                            <form onSubmit={submitVertify}>
                                <div
                                    className='input-field'
                                    ref={inputFieldRef}
                                >
                                    <input
                                        type='number'
                                        value={inputOTP[0]}
                                        onChange={(e) => handleInputOTP(e, 0)}
                                    />
                                    <input
                                        type='number'
                                        value={inputOTP[1]}
                                        onChange={(e) => handleInputOTP(e, 1)}
                                    />
                                    <input
                                        type='number'
                                        value={inputOTP[2]}
                                        onChange={(e) => handleInputOTP(e, 2)}
                                    />
                                    <input
                                        type='number'
                                        value={inputOTP[3]}
                                        onChange={(e) => handleInputOTP(e, 3)}
                                    />
                                </div>
                                <button
                                    className={`${
                                        inputOTP.every((i) => i != "")
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    Xác nhận
                                </button>
                            </form>
                            <p>
                                Chưa nhận được?{" "}
                                <span>
                                    <Link to='#'>Gửi lại</Link>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPage;
