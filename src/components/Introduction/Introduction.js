import React from "react";
import { Link } from "react-router-dom";
import "./Introduction.css";

const Introduction = ({ object }) => {
    return (
        <div className='introduction-item'>
            <iframe
                src={object.youtubeLink}
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
            ></iframe>
            <div className='introduction-text'>
                <div className='introduction-title'>{object.title}</div>
                <div className='introduction-description'>
                    {object.description}
                </div>
                <div className='introduction-more'>
                    <Link to={object.link}>Chi tiết {">"}</Link>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
