import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditorState } from "draft-js";
import { format } from "date-fns";
import axios from "axios";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/CustomBreadcrumb";
import Config from "../../utils/Config";
import "./IntroductionDetailPage.css";

const IntroductionDetailPage = () => {
    const API = `${Config.BASE_API_URL}/introductions`;
    const { id } = useParams();
    const [intro, setIntro] = useState();
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${API}/${id}`);
            setIntro(res.data.data);
            console.log(res.data.data);
        };
        fetchData();
    }, []);
    return (
        <>
            <PageTitle title={"Giới thiệu sách"} /> <CustomBreadcrumb />
            <div className='section'>
                <div className='container'>
                    {intro && (
                        <div className='intro-detail' style={{ width: "100%" }}>
                            <div className='intro-detail-title'>
                                {intro.title}
                            </div>
                            <div className='intro-detail-author'>
                                {"Tác giả: " +
                                    intro.author.fullName +
                                    ", " +
                                    format(
                                        intro.createdAt,
                                        "dd MMM yyyy, h:mm a"
                                    )}
                            </div>
                            <iframe
                                src={intro.resource.path}
                                title='YouTube video player'
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                            ></iframe>
                            <div className='intro-detail-content'>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: intro.content,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default IntroductionDetailPage;
