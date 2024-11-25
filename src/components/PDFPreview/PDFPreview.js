import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "./PDFPreview.css";

const PDFPreview = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // Hàm xử lý khi PDF được tải
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    return (
        <div className='pdf-preview'>
            <div className='pdf-container'>
                <Document
                    file='/documents/CV Hung Phong Pham - CV intern backend-TopCV.vn.pdf'
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={1.9}
                        renderTextLayer={false} // Tắt textLayer
                        renderAnnotationLayer={false} // Tắt annotationLayer
                    />

                    {/* Giới hạn page */}
                    {/* {Array.from(new Array(3), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                    ))} */}
                </Document>
            </div>
            <div className='pdf-pagination'>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber(pageNumber - 1)}
                >
                    Previous
                </button>
                <button
                    disabled={pageNumber >= numPages}
                    onClick={() => setPageNumber(pageNumber + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PDFPreview;
