import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewForm.css";

function ReviewForm({ bookId, onSubmitReview }) {
    const nav = useNavigate();
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo.expiryTime - Date.now() > 0) {
            const reviewData = {
                user: userInfo.data._id,
                book: bookId,
                rating,
                content,
            };
            onSubmitReview(reviewData);
        } else {
            nav("/auth/login");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='review-form'>
            <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            >
                {[5, 4, 3, 2, 1].map((ratingValue) => (
                    <option key={ratingValue} value={ratingValue}>
                        {ratingValue}
                        {" sao"}
                    </option>
                ))}
            </select>
            <div className='review-form-right'>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={10}
                ></textarea>
                <button type='submit'>Đánh giá</button>
            </div>
        </form>
    );
}

export default ReviewForm;
