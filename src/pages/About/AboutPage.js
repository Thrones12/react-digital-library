import React from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import CounterSection from "../../components/Counter/CounterSection";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <>
            <PageTitle title={"Giới thiệu về chúng tôi"} />

            <div className='section-about'>
                <div className='container'>
                    <div className='about-content'>
                        <div className='row'>
                            <div className='col col-6'>
                                <h2>Chúng tôi là ai?</h2>
                                <div className='seperator'></div>
                                <p>
                                    Thư viện số là nền tảng trực tuyến mang đến
                                    quyền truy cập vào kho tài liệu học thuật đa
                                    dạng, phục vụ nhu cầu học tập và nghiên cứu
                                    của mọi người. Chúng tôi cung cấp e-books,
                                    bài giảng, luận văn và nghiên cứu từ nhiều
                                    lĩnh vực khác nhau như khoa học tự nhiên, xã
                                    hội, công nghệ và nghệ thuật, giúp người
                                    dùng dễ dàng tiếp cận tri thức một cách
                                    thuận tiện và hiện đại.
                                </p>
                                <p>
                                    Không chỉ là một thư viện trực tuyến, Thư
                                    viện số còn là cầu nối đưa tri thức đến gần
                                    hơn với cộng đồng. Với tài liệu được chọn
                                    lọc kỹ lưỡng, nền tảng thân thiện, cùng sự
                                    hỗ trợ của công nghệ hiện đại, chúng tôi
                                    không ngừng phát triển và mở rộng nguồn tài
                                    nguyên, trở thành người bạn đồng hành đáng
                                    tin cậy trên hành trình học tập của bạn.
                                </p>
                                <h4>
                                    Thư viện số - nơi lưu giữ tri thức, mở ra
                                    tương lai.
                                </h4>
                            </div>
                            <div className='col col-6'>
                                <img
                                    src='/images/about-img-1.png'
                                    alt='about'
                                />
                            </div>
                        </div>
                        {/* WEB DATA SECTION */}
                        <div className='web-data'>
                            <div className='web-data-item download-data'>
                                <img src='/images/icon-download.png' />
                                <h6>Lượt tải sách</h6>
                                <CounterSection totalCount={81760} />{" "}
                            </div>
                            <div className='web-data-item book-data'>
                                <img src='/images/icon-book.png' />
                                <h6>Số lượng sách</h6>
                                <CounterSection totalCount={10000} />{" "}
                            </div>
                            <div className='web-data-item user-data'>
                                <img src='/images/icon-user.png' />
                                <h6>Người dùng</h6>
                                <CounterSection totalCount={5175} />{" "}
                            </div>
                            <div className='web-data-item cate-data'>
                                <img src='/images/icon-cate.png' />
                                <h6>Thể loại sách</h6>
                                <CounterSection totalCount={58} />{" "}
                            </div>
                        </div>

                        <div className='row' style={{ marginTop: "80px" }}>
                            <div className='col col-6'>
                                <img
                                    style={{ width: "450px", margin: "0 auto" }}
                                    src='/images/our-community.png'
                                    alt='about'
                                />
                            </div>
                            <div className='col col-6'>
                                <h2>Cộng đồng</h2>
                                <div className='seperator'></div>
                                <p>
                                    Thư viện số là một nền tảng học thuật trực
                                    tuyến không ngừng lớn mạnh, với sự tham gia
                                    của hàng trăm độc giả đam mê tri thức và
                                    nhiều cá nhân, tổ chức đóng góp tài liệu học
                                    thuật chất lượng.
                                </p>
                                <p>
                                    Cộng đồng của Thư viện số được xây dựng trên
                                    tinh thần chia sẻ và hỗ trợ lẫn nhau. Từ
                                    những tài liệu đầu tiên được các giảng viên
                                    cung cấp, đến những đóng góp không ngừng của
                                    sinh viên, nhà nghiên cứu, và chuyên gia,
                                    chúng tôi tự hào là cầu nối mang tri thức
                                    đến gần hơn với mọi người.
                                </p>

                                <q style={{ fontWeight: "500" }}>
                                    Chia sẻ tri thức là cách nhanh nhất để cộng
                                    đồng cùng phát triển. Chúng tôi tin rằng mỗi
                                    tài liệu là một viên gạch xây nên ngôi nhà
                                    tri thức chung của nhân loại.
                                </q>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
