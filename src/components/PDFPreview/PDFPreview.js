import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "./PDFPreview.css";

const PDFPreview = ({ document }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [tempPageNumber, setTempPageNumber] = useState(1); // Dùng để lưu giá trị nhập tạm thời

    // Hàm xử lý khi PDF được tải
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    // Hàm xử lý khi người dùng nhập trang
    const handlePageInputChange = (e) => {
        const inputPage = parseInt(e.target.value, 10);
        setTempPageNumber(isNaN(inputPage) ? "" : inputPage); // Lưu giá trị tạm thời
    };

    // Chuyển trang khi nhấn Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (tempPageNumber <= 0) {
                setTempPageNumber(1);
                setPageNumber(1);
            } else if (tempPageNumber > numPages) {
                setTempPageNumber(numPages);
                setPageNumber(numPages);
            } else {
                setPageNumber(tempPageNumber);
            }
        }
    };

    return (
        <div className='pdf-preview'>
            <div className='pdf-container'>
                <Document file={document} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page
                        pageNumber={pageNumber}
                        scale={1.9}
                        renderTextLayer={false} // Tắt textLayer
                        renderAnnotationLayer={false} // Tắt annotationLayer
                    />
                </Document>
            </div>
            <div className='pdf-pagination'>
                <p>
                    Page{" "}
                    <input
                        style={{ width: "40px" }}
                        type='number'
                        min='1'
                        max={numPages}
                        value={tempPageNumber}
                        onChange={handlePageInputChange}
                        onKeyDown={handleKeyDown} // Lắng nghe sự kiện nhấn phím
                    />{" "}
                    of {numPages}
                </p>
                <button
                    disabled={pageNumber <= 1}
                    onClick={() => {
                        setPageNumber((prev) => prev - 1);
                        setTempPageNumber((prev) => prev - 1);
                    }}
                >
                    Previous
                </button>
                <button
                    disabled={pageNumber >= numPages}
                    onClick={() => {
                        setPageNumber((prev) => prev + 1);
                        setTempPageNumber((prev) => prev + 1);
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PDFPreview;
