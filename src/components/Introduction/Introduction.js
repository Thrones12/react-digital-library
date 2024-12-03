import React from "react";
import { Link } from "react-router-dom";
import "./Introduction.css";

const Introduction = ({ object }) => {
    return (
        <div className='introduction-item'>
            <iframe
                src={object.resource.path}
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            ></iframe>
            <div className='introduction-text'>
                <div className='introduction-title'>{object.title}</div>
                <div className='introduction-description'>{object.content}</div>
                <div className='introduction-more'>
                    <Link to={`/introductions/${object._id}`}>
                        Chi tiết {">"}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
