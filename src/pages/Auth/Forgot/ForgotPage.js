import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ForgotPage.css";

const ForgotPage = () => {
    const inputFieldRef = useRef(null);

    useEffect(() => {
        if (inputFieldRef.current) {
            const inputElements =
                inputFieldRef.current.querySelectorAll("input");
            setInputs(inputElements);
        }
    }, []);

    const [active, setActive] = useState(false);
    const [inputOTP, setInputOTP] = useState(["", "", "", ""]);
    const [inputs, setInputs] = useState([]);

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
    };

    return (
        <div className='forgot-page'>
            <button onClick={() => setActive(!active)}>Click</button>
            <div className={`flip-card ${active ? "active" : ""}`}>
                <div className='flip-card-inner'>
                    <div className='flip-card-front'>
                        <div className='flip-card-front-header'></div>
                        <h3>Quên mật khẩu</h3>
                        <p>
                            Nhập Email của bạn và tôi sẽ gửi OTP đến Email để
                            bạn lấy lại mật khẩu
                        </p>
                        <form>
                            <input type='email' placeholder='Email' />
                            <button className='active'>Register</button>
                        </form>

                        <p>
                            Quay lại trang đăng nhập?{" "}
                            <span>
                                <Link to='/auth/login'>Đăng nhập</Link>
                            </span>
                        </p>
                    </div>

                    <div className='flip-card-back'>
                        <div className='flip-card-back-header'></div>
                        <h3>Enter OTP</h3>
                        <p>OTP sent via Email</p>
                        <form>
                            <div className='input-field' ref={inputFieldRef}>
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
                                Vertify
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
    );
};

export default ForgotPage;
