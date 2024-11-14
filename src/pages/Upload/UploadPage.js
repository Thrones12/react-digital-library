import React, { useState } from "react";
import "./UploadPage.css";

const UploadPage = () => {
    const [fileName, setFileName] = useState("Chưa có tệp nào được chọn");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("Chưa có tệp nào được chọn");
        }
    };
    return (
        <>
            <div className='page-title'>
                <div className='background-image'>
                    <div className='container'>
                        <h2>TẶNG TÀI LIỆU</h2>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='upload-content'>
                    <div className='col col-4'>
                        <div className='thanks'>
                            <h1>Lời Cảm Ơn</h1>
                            <p>
                                Chúng tôi xin chân thành cảm ơn bạn đã gửi tài
                                liệu quý báu đến <strong>Thư viện Số</strong>.
                                Đóng góp của bạn không chỉ giúp làm phong phú
                                thêm kho tài nguyên của chúng tôi mà còn góp
                                phần chia sẻ tri thức, hỗ trợ cộng đồng học tập
                                và nghiên cứu.
                            </p>
                            <p>
                                Đội ngũ Thư viện Số sẽ xem xét và sắp xếp tài
                                liệu của bạn để đảm bảo rằng nó sẽ sớm đến với
                                những người cần. Một lần nữa, xin cảm ơn bạn vì
                                sự đóng góp ý nghĩa này!
                            </p>
                            <p>
                                Trân trọng,
                                <br />
                                <strong>Thư viện Số</strong>
                            </p>
                        </div>
                    </div>
                    <div className='col col-8'>
                        <div class='upload-form'>
                            <h1>Biểu mẫu</h1>
                            <p>
                                Sử dụng mẫu dưới đây để liên hệ với chúng tôi.
                            </p>
                            <form>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    placeholder='Tên người gửi'
                                    required
                                />
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Email'
                                    required
                                />
                                <input
                                    type='text'
                                    id='phone'
                                    name='phone'
                                    placeholder='Số điện thoại'
                                />

                                <div className='file-upload'>
                                    <label
                                        htmlFor='file-input'
                                        className='custom-file-upload'
                                    >
                                        Tải lên
                                    </label>
                                    <input
                                        type='file'
                                        id='file-input'
                                        name='file-input'
                                        onChange={handleFileChange}
                                        style={{ display: "none" }} // Ẩn input file
                                    />
                                    <span id='file-name'>{fileName}</span>
                                </div>

                                <textarea
                                    rows={10}
                                    id='message'
                                    name='message'
                                    placeholder='Tin nhắn'
                                    required
                                ></textarea>
                                <button type='submit'>Gửi tài liệu </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploadPage;
