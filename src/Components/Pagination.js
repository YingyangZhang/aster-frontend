import React from "react";

export default function Pagination({totalImages, imagesPerPage, currentPage, setCurrentPage, handlePages}) {
    const pageNums = [];

    for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
        pageNums.push(i);
    }

    function handlePrePage() {
        setCurrentPage(currentPage => currentPage - 1);
    }

    function handleNextPage() {
        setCurrentPage(currentPage => currentPage + 1);
    }

    return (
        <div className="pagination container">
            {currentPage ===  1 ? null : <a href="#gallery"><i className='bx bx-chevron-left' onClick={handlePrePage}></i></a>}
            {pageNums.map((num) => {
                return <a href="#gallery" key={num} className={num === currentPage ? "num-focused" : null} onClick={() => handlePages(num)}>{num}</a>;
            })}
            {currentPage === pageNums.slice(-1)[0] ? null : <a href="#gallery"><i className='bx bx-chevron-right' onClick={handleNextPage}></i></a>}
        </div>
    )
}