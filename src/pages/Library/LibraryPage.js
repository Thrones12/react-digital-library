import React from "react";
import { Link } from "react-router-dom";
import "./LibraryPage.css";

const LibraryPage = () => {
    return (
        <div className='col col-10'>
            <div className='cards'>
                <Link to='/book/1' className='card'>
                    <img src='/images/book-item.jpg' alt='Book Item' />
                    <div className='card-content'>
                        <div className='card-title'>Luân hồi lạc viên</div>
                        <div className='card-footer'>
                            <div className='card-author'>Phong</div>
                            <div className='card-category'>Khoa huyễn</div>
                        </div>
                    </div>
                </Link>
                <Link to='/book/1' className='card'>
                    <img src='/images/book-item.jpg' alt='Book Item' />
                    <div className='card-content'>
                        <div className='card-title'>Luân hồi lạc viên</div>
                        <div className='card-footer'>
                            <div className='card-author'>Phong</div>
                            <div className='card-category'>Khoa huyễn</div>
                        </div>
                    </div>
                </Link>
                <Link to='/book/1' className='card'>
                    <img src='/images/book-item.jpg' alt='Book Item' />
                    <div className='card-content'>
                        <div className='card-title'>Luân hồi lạc viên</div>
                        <div className='card-footer'>
                            <div className='card-author'>Phong</div>
                            <div className='card-category'>Khoa huyễn</div>
                        </div>
                    </div>
                </Link>
                <Link to='/book/1' className='card'>
                    <img src='/images/book-item.jpg' alt='Book Item' />
                    <div className='card-content'>
                        <div className='card-title'>Luân hồi lạc viên</div>
                        <div className='card-footer'>
                            <div className='card-author'>Phong</div>
                            <div className='card-category'>Khoa huyễn</div>
                        </div>
                    </div>
                </Link>
                <Link to='/book/1' className='card'>
                    <img src='/images/book-item.jpg' alt='Book Item' />
                    <div className='card-content'>
                        <div className='card-title'>Luân hồi lạc viên</div>
                        <div className='card-footer'>
                            <div className='card-author'>Phong</div>
                            <div className='card-category'>Khoa huyễn</div>
                        </div>
                    </div>
                </Link>
                <Link to='/book/1' className='card'>
                    <img src='/images/book-item.jpg' alt='Book Item' />
                    <div className='card-content'>
                        <div className='card-title'>Luân hồi lạc viên</div>
                        <div className='card-footer'>
                            <div className='card-author'>Phong</div>
                            <div className='card-category'>Khoa huyễn</div>
                        </div>
                    </div>
                </Link>
                <Link to='/book/1' className='card'>
                    <img src='/images/book-item.jpg' alt='Book Item' />
                    <div className='card-content'>
                        <div className='card-title'>Luân hồi lạc viên</div>
                        <div className='card-footer'>
                            <div className='card-author'>Phong</div>
                            <div className='card-category'>Khoa huyễn</div>
                        </div>
                    </div>
                </Link>
                <Link to='/book/1' className='card'>
                    <img src='/images/book-item.jpg' alt='Book Item' />
                    <div className='card-content'>
                        <div className='card-title'>Luân hồi lạc viên</div>
                        <div className='card-footer'>
                            <div className='card-author'>Phong</div>
                            <div className='card-category'>Khoa huyễn</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default LibraryPage;
