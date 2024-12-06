import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Config from "../../utils/Config";
import "./ReviewList.css";

function ReviewList({ bookId }) {
    const API = `${Config.BASE_API_URL}/reviews`;
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await axios.get(`${API}/getByBook/${bookId}`);
            setReviews(res.data.data);
        };

        fetchReviews();
    }, [bookId]);

    return (
        <div>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className='review-item'>
                        <div className='review-user'>
                            <img src={review.user.profilePicture} />
                            <p style={{ marginTop: "-5px" }}>
                                {review.rating}/5
                            </p>
                        </div>
                        <div className='review-content'>
                            <div className='review-header'>
                                <p className='review-username'>
                                    {review.user.fullName}
                                </p>
                                <p className='review-date'>
                                    {format(
                                        review.createdAt,
                                        "dd MMM yyyy, h:mm a"
                                    )}
                                </p>
                            </div>
                            <p className='review-main'>{review.content}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
}

export default ReviewList;