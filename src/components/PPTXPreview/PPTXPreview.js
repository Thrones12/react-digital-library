import React from "react";

const PPTXPreview = ({ fileUrl }) => {
    return (
        <div
            style={{
                borderRadius: "5px",
                overflow: "hidden",
                marginTop: "10px",
            }}
        >
            <iframe
                src={fileUrl}
                frameBorder='0'
                width='1200'
                height='749'
                allowFullScreen={true}
                mozallowfullscreen='true'
                webkitallowfullscreen='true'
            ></iframe>
        </div>
    );
};

export default PPTXPreview;
