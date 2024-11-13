import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const [active, setActive] = useState(false);

    return (
        <div className='login-page'>
            <div className={`container ${active ? "right-panel-active" : ""}`}>
                <div className='form-container register-container'>
                    <form>
                        <h1>Register here</h1>
                        <input type='text' placeholder='Name' />
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Password' />
                        <button>Register</button>
                    </form>
                </div>

                <div className='form-container login-container'>
                    <form>
                        <h1>Login here</h1>
                        <input type='email' placeholder='Email' />
                        <input type='password' placeholder='Password' />
                        <div className='content'>
                            <div className='checkbox'>
                                <input
                                    type='checkbox'
                                    name='checkbox'
                                    id='checkbox'
                                />
                                <label for='Remember me'>Remenber me</label>
                            </div>
                            <div className='pass-link'>
                                <Link to='/auth/forgot'>Forgot password</Link>
                            </div>
                        </div>
                        <button>Login</button>
                    </form>
                </div>

                <div className='overlay-container'>
                    <div className='overlay'>
                        <div className='overlay-panel overlay-left'>
                            <h1 className='title'>
                                Hello <br /> friends
                            </h1>
                            <p>
                                If you have an account, login here and have fun
                            </p>
                            <button
                                className='ghost'
                                id='login'
                                onClick={() => setActive(false)}
                            >
                                Login
                            </button>
                        </div>
                        <div className='overlay-panel overlay-right'>
                            <h1 className='title'>
                                Start your <br /> journey now
                            </h1>
                            <p>
                                If you don't have an account, join us and start
                                your journey
                            </p>
                            <button
                                className='ghost'
                                id='register'
                                onClick={() => setActive(true)}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
