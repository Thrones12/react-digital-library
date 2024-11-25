import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import "./RequestPage.css";

const RequestPage = () => {
    return (
        <>
            <PageTitle title={"Yêu cầu sách mới"} />
            <div className='section-request'>
                <div className='container'>
                    <div className='request-content'>
                        <div className='col col-6'>
                            <div className='thanks'>
                                <h1>Đề xuất tài liệu bạn cần</h1>
                                <div className='seperator'></div>
                                <p>
                                    Tại Thư viện số, chúng tôi luôn lắng nghe ý
                                    kiến đóng góp từ cộng đồng để mở rộng và cập
                                    nhật nguồn tài nguyên học thuật. Nếu bạn cần
                                    một tài liệu chưa có trong thư viện, hãy
                                    điền vào biểu mẫu bên dưới.
                                </p>
                                <p>
                                    Chúng tôi sẽ xem xét yêu cầu của bạn và cố
                                    gắng bổ sung tài liệu phù hợp trong thời
                                    gian sớm nhất. Hãy giúp chúng tôi làm phong
                                    phú hơn kho tri thức, vì một cộng đồng học
                                    tập phát triển!
                                </p>
                                <p>
                                    Trân trọng,
                                    <br />
                                    <strong>Thư viện Số</strong>
                                </p>
                            </div>
                        </div>
                        <div className='col col-6'>
                            <div class='request-form'>
                                <h1>Biểu mẫu yêu cầu</h1>
                                <div className='seperator'></div>
                                <p></p>
                                <form>
                                    <input
                                        type='text'
                                        id='book-title'
                                        name='book-title'
                                        placeholder='Tên tài liệu'
                                        required
                                    />
                                    <input
                                        type='text'
                                        id='book-author'
                                        name='book-author'
                                        placeholder='Tên tác giả (nếu biết)'
                                    />
                                    <input
                                        type='text'
                                        id='book-category'
                                        name='book-category'
                                        placeholder='Thể loại. Ví dụ: Công nghệ, Khoa học...'
                                    />{" "}
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='Email liên hệ'
                                        required
                                    />
                                    <textarea
                                        id='reason'
                                        name='reason'
                                        placeholder='Hãy cho chúng tôi biết lý do bạn cần tài liệu này...'
                                        rows='10'
                                    ></textarea>
                                    <button type='submit'>Gửi yêu cầu</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestPage;
