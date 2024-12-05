import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "../../components/Table/Table";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import Config from "../../utils/Config";
import NotiUtils from "../../utils/NotiUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./ProfilePage.css";

const ProfilePage = () => {
    const HIS_API = `${Config.BASE_API_URL}/histories`;
    const AUTH_API = `${Config.BASE_API_URL}/auth`;
    const location = useLocation();
    const [path, setPath] = useState();
    const [user, setUser] = useState(null);
    const [expiryTime, setExpiryTime] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [requests, setRequests] = useState([]);
    const [follows, setFollows] = useState([]);
    const [downloads, setDownloads] = useState([]);

    useEffect(() => {
        setPath(location.pathname);
    }, [location]);

    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            console.log(userInfo.data);

            if (userInfo.expiryTime - Date.now() > 0) {
                setUser(userInfo.data);
                setExpiryTime(userInfo.expiryTime);
                setFollows(
                    userInfo.data.followedBook.map((book) => {
                        return {
                            barcode: book.DescriptiveMetadata.barcode,
                            title: book.DescriptiveMetadata.title,
                            author: book.DescriptiveMetadata.author,
                            publisher: book.DescriptiveMetadata.publisher,
                            path: book.files,
                        };
                    })
                );

                setRequests(
                    userInfo.data.requestHistory.map((request) => {
                        return {
                            title: request.title,
                            author: request.author,
                            category: request.category,
                            publisher: request.publisher,
                            status:
                                request.status === "Pending"
                                    ? "Chờ duyệt"
                                    : request.status === "Approved"
                                    ? "Chấp nhận"
                                    : request.status === "Rejected"
                                    ? "Từ chối"
                                    : request.status === "InProcess"
                                    ? "Đang xử lí"
                                    : request.status === "Completed"
                                    ? "Đã thêm"
                                    : null,
                        };
                    })
                );

                const sortedDownloadHistory =
                    userInfo.data.downloadHistory.sort((a, b) => {
                        const dateA = new Date(a.downloadAt); // Convert to Date object if it's a date string
                        const dateB = new Date(b.downloadAt);

                        return dateB - dateA; // Sort in descending order (newest first)
                    });

                setDownloads(
                    sortedDownloadHistory.map((down) => {
                        return {
                            title: down.book.DescriptiveMetadata.title,
                            author: down.book.DescriptiveMetadata.author,
                            downloadAt: format(
                                down.downloadAt,
                                "dd MMM yyyy, h:mm a"
                            ),
                            path: down.book.files,
                        };
                    })
                );
            }
        } catch (err) {}
    }, []);

    const theadDownload = [
        "STT",
        "Tên tài liệu",
        "Tác giả",
        "Ngày tải",
        "Thao tác",
    ];

    const theadBookshelf = [
        "STT",
        "Mã",
        "Tên tài liệu",
        "Tác giả",
        "NXB",
        "Thao tác",
    ];
    const theadRequest = [
        "STT",
        "Tên tài liệu",
        "Tác giả",
        "Thể loại",
        "NXB",
        "Trạng thái",
    ];

    const API = `${Config.BASE_API_URL}/users`;
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: user ? user.email : "",
            fullName: user ? user.fullName : "",
            phone: user ? user.phone : "",
            password: user ? user.password : "",
        },
        validateOnChange: Yup.object({
            email: Yup.string().required(),
            fullName: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("email", values.email);
                formData.append("fullName", values.fullName);
                formData.append("phone", values.phone);
                formData.append("password", values.password);
                formData.append("file", file);
                console.log(file);

                const res = await axios.put(API, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data", // Đặt Content-Type
                    },
                });
                user.profilePicture = res.data.data.profilePicture;
                // Lưu thông tin user vào localStorage
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                userInfo.data = { ...user, phone: values.phone };
                localStorage.setItem(
                    "userInfo",
                    JSON.stringify({
                        data: userInfo.data,
                        expiryTime: userInfo.expiryTime,
                    })
                );
                NotiUtils.success("Cập nhập thành công");
            } catch (err) {
                console.log(err);

                if (err.status === 400) {
                    NotiUtils.error(err.response.data.details);
                } else {
                    NotiUtils.error("Cập nhập thất bại");
                }
            }
        },
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setUser({ ...user, profilePicture: URL.createObjectURL(file) });
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const handleDownload = async (e, filePath, book_id) => {
        e.preventDefault(); // Prevent default behavior of the link

        if (!filePath) {
            console.error("No file path provided");
            return;
        }
        const link = document.createElement("a");
        link.href = filePath; // File path or API endpoint
        link.download = filePath.split("/").pop(); // Extract file name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        try {
            const res = await axios.post(HIS_API, {
                user: user._id,
                book: book_id,
            });
            const resUser = await axios.post(`${AUTH_API}/login`, {
                email: user.email,
                password: user.password,
            });

            const sortedDownloadHistory =
                resUser.data.data.downloadHistory.sort((a, b) => {
                    const dateA = new Date(a.downloadAt); // Convert to Date object if it's a date string
                    const dateB = new Date(b.downloadAt);

                    return dateB - dateA; // Sort in descending order (newest first)
                });
            setDownloads(
                sortedDownloadHistory.map((down) => {
                    return {
                        title: down.book.DescriptiveMetadata.title,
                        author: down.book.DescriptiveMetadata.author,
                        downloadAt: format(
                            down.downloadAt,
                            "dd MMM yyyy, h:mm a"
                        ),
                        path: down.book.files,
                    };
                })
            );

            // Lưu thông tin user vào localStorage
            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    data: resUser.data.data,
                    expiryTime: expiryTime,
                })
            );
        } catch (err) {}
    };
    return (
        <>
            <PageTitle title={"Tài khoản của bạn"} />
            <CustomBreadcrumb />
            <div className='section-profile'>
                <div className='container'>
                    <div className='col col-2'>
                        <div className='profile-aside'>
                            <div className='profile-aside-header'>
                                Điều hướng
                            </div>
                            <div className='profile-aside-item'>
                                <Link
                                    to='/profile'
                                    className={
                                        path === "/profile" ? "active" : ""
                                    }
                                >
                                    Hồ sơ
                                </Link>
                                <Link
                                    to='/profile/bookshelf'
                                    className={
                                        path === "/profile/bookshelf"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Tủ sách
                                </Link>
                                <Link
                                    to='/profile/request'
                                    className={
                                        path === "/profile/request"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Yêu cầu
                                </Link>
                                <Link
                                    onClick={() => {
                                        NotiUtils.infoWithDirection({
                                            text: "Bạn có muốn đăng xuất?",
                                            confirmText: "Đăng xuất",
                                            func: async () => {
                                                localStorage.removeItem(
                                                    "userInfo"
                                                );
                                                window.location.href = "/home";
                                            },
                                        });
                                    }}
                                >
                                    Đăng xuất
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col col-10'>
                        <div className='profile-main'>
                            {location.pathname === "/profile" ? (
                                <>
                                    <div className='col col-4'>
                                        <div className='profile-container'>
                                            <h1>Thông tin người dùng</h1>
                                            <div className='seperator'></div>
                                            <p></p>
                                            <form
                                                onSubmit={formik.handleSubmit}
                                            >
                                                {user && (
                                                    <div>
                                                        <img
                                                            src={
                                                                user.profilePicture
                                                            }
                                                            alt='User profile'
                                                            onClick={() =>
                                                                fileInputRef.current.click()
                                                            }
                                                        />
                                                    </div>
                                                )}
                                                <input
                                                    type='file'
                                                    ref={fileInputRef}
                                                    style={{
                                                        display: "none",
                                                    }}
                                                    onChange={handleFileChange}
                                                />
                                                <input
                                                    type='email'
                                                    id='email'
                                                    name='email'
                                                    value={formik.values.email}
                                                    disabled
                                                    {...formik.getFieldProps(
                                                        "email"
                                                    )}
                                                />
                                                <input
                                                    type='text'
                                                    id='fullName'
                                                    name='fullName'
                                                    placeholder='Tên người dùng'
                                                    value={
                                                        formik.values.fullName
                                                    }
                                                    required
                                                    {...formik.getFieldProps(
                                                        "fullName"
                                                    )}
                                                />
                                                <input
                                                    type='text'
                                                    id='phone'
                                                    name='phone'
                                                    placeholder='Số điện thoại'
                                                    value={formik.values.phone}
                                                    {...formik.getFieldProps(
                                                        "phone"
                                                    )}
                                                />{" "}
                                                <input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    id='password'
                                                    name='password'
                                                    placeholder='Mật khẩu'
                                                    required
                                                    value={
                                                        formik.values.password
                                                    }
                                                    {...formik.getFieldProps(
                                                        "password"
                                                    )}
                                                />{" "}
                                                {showPassword ? (
                                                    <FontAwesomeIcon
                                                        icon={faEyeSlash}
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                        style={{
                                                            bottom: "75px",
                                                            right: "20px",
                                                        }}
                                                    />
                                                ) : (
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                        onClick={
                                                            togglePasswordVisibility
                                                        }
                                                        style={{
                                                            bottom: "75px",
                                                            right: "20px",
                                                        }}
                                                    />
                                                )}
                                                <button type='submit'>
                                                    Cập nhập thông tin
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className='col col-7'>
                                        <div className='profile-container'>
                                            <h1>Lịch sử tải</h1>
                                            <div className='seperator'></div>
                                            <p></p>
                                            <Table
                                                ids={
                                                    user
                                                        ? user.downloadHistory.map(
                                                              (h) => h.book._id
                                                          )
                                                        : []
                                                }
                                                data={downloads}
                                                theads={theadDownload}
                                                handleDownload={handleDownload}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : null}
                            {location.pathname === "/profile/bookshelf" ? (
                                <div className='col col-12'>
                                    <div className='profile-container'>
                                        <h1>Tủ sách</h1>
                                        <div className='seperator'></div>
                                        <p></p>
                                        <Table
                                            data={follows}
                                            theads={theadBookshelf}
                                            handleDownload={handleDownload}
                                        />
                                    </div>
                                </div>
                            ) : null}
                            {location.pathname === "/profile/request" ? (
                                <div className='col col-12'>
                                    <div className='profile-container'>
                                        <h1>Yêu cầu đã gửi</h1>
                                        <div className='seperator'></div>
                                        <p></p>
                                        <Table
                                            data={requests}
                                            theads={theadRequest}
                                            handleDownload={handleDownload}
                                        />
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
