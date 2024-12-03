import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowUpWideShort,
    faArrowUpShortWide,
} from "@fortawesome/free-solid-svg-icons";
import "./SortDropdown.css";

const SortDropdown = ({
    standards,
    sortFunction,
    selected,
    setSelected,
    isAscending,
    setIsAscending,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSortOrder = () => {
        setIsAscending(!isAscending);
        sortFunction(selected.type, !isAscending);
    };

    const handleSort = (s) => {
        setSelected(s);
        setIsOpen(false);

        sortFunction(s.type, isAscending);
    };

    return (
        <>
            {/* Sort By */}
            <div className='dropdown'>
                <div
                    className={`dropdown-selected ${isOpen ? "active" : ""}`}
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    {selected.name}
                </div>
                <div className={`dropdown-options ${isOpen ? "active" : ""}`}>
                    {standards.map((standard, index) => (
                        <div
                            key={index}
                            className={
                                selected.name === standard.name ? "active" : ""
                            }
                            onClick={() => handleSort(standard)}
                        >
                            {standard.name}
                        </div>
                    ))}
                </div>
            </div>
            {/* Sort Order */}
            <button className='btn-sort-order' onClick={handleSortOrder}>
                {isAscending ? (
                    <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                    <FontAwesomeIcon icon={faArrowUpShortWide} />
                )}
            </button>
        </>
    );
};

export default SortDropdown;
