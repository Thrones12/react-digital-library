// File CounterSection.js
import React, { useEffect, useRef, useState } from "react";
import "./CounterSection.css";

const CounterSection = ({ totalCount, speedTime }) => {
    const [count, setCount] = useState(
        totalCount - 300 > 0 ? totalCount - 300 : 0
    );
    const counterRef = useRef(null);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        // Sử dụng Intersection Observer API để phát hiện khi phần tử vào viewport
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 } // Kích hoạt khi 50% phần tử xuất hiện
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, [hasStarted]);

    useEffect(() => {
        let interval;
        if (hasStarted && count < totalCount) {
            interval = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, 1); // Tốc độ đếm, có thể điều chỉnh
        }
        return () => clearInterval(interval);
    }, [hasStarted, count]);

    return (
        <div ref={counterRef} className='counter-section'>
            {count}
        </div>
    );
};

export default CounterSection;
