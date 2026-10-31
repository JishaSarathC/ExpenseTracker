
import React from 'react';
import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";
import "./Pagination.css";

export default function Pagination({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="pagination">

            <button
                className="button1"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                <VscArrowLeft />
            </button>

            <span className="page-number">
                {currentPage}
            </span>

            <button
                className="button2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                <VscArrowRight />
            </button>

        </div>
    );
}
