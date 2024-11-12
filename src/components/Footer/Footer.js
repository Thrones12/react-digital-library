import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className='container'>
                <div className='footer'>
                    <p className='copy-right'>
                        Copyright © 2024 Thư viện kỹ thuật số - Phạm Hùng Phong
                    </p>
                    <div class='socials'>
                        <Link
                            to='https://www.facebook.com/yourprofile'
                            target='_blank'
                            class='social-icon facebook'
                        >
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                        <a
                            href='https://www.instagram.com/yourprofile'
                            target='_blank'
                            class='social-icon instagram'
                        >
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;