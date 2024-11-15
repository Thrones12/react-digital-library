import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./LibraryPage.css";

const LibraryPage = () => {
    return (
        <>
            <PageTitle title={"Tri thức trong tầm tay"} />

            <div className='section-library'>
                <div className='container'>
                    <div className='direction'>
                        <div className='breadcrumb col col-2'>
                            <Link to='/home'>Trang chủ</Link>
                            <p>{" > "}</p>
                            <Link to='/library'>Thư viện</Link>
                        </div>

                        <div className='tools col col-10'>
                            <div className='search'>
                                <input
                                    type='text'
                                    className='tool-search'
                                    placeholder='Tìm kiếm'
                                />
                            </div>
                            <div className='sort'>
                                <button>Sort</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='col col-10'>
                        <div className='cards'>
                            <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link to='/book/1' className='card'>
                                <img
                                    src='/images/book-item.jpg'
                                    alt='Book Item'
                                />
                                <div className='card-content'>
                                    <div className='card-title'>
                                        Luân hồi lạc viên
                                    </div>
                                    <div className='card-footer'>
                                        <div className='card-author'>Phong</div>
                                        <div className='card-category'>
                                            Khoa huyễn
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LibraryPage;
