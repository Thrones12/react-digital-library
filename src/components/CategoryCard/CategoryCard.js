import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
    return (
        <Link to={`/library?${category.name}`} className='category-card-link'>
            <div className='category-card'>
                <img
                    className='card-img'
                    src={category.picture}
                    alt='Category'
                />
                <div className='card-title'>{category.name}</div>
            </div>
        </Link>
    );
};

export default CategoryCard;
