import React from "react";
import { Link } from "react-router-dom";
import "./ButtonToRight.css";

const ButtonToRight = ({ link, text }) => {
    return (
        <div className='btn-to-right'>
            <Link className='btn-link' to={link}>
                <div className='overlay'></div>
                <p>{text}</p>
            </Link>
        </div>
    );
};

export default ButtonToRight;
