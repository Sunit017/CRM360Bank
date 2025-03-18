import React, { useEffect, useState } from "react";
import styled from "styled-components";
const PaginationView = styled.div`
  margin-top: 5px;
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .paginationItem {
    background: #fff;
    border: 2px solid #666;
    padding: 10px 15px;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    position: relative;
    margin: 0 5px;
    cursor: pointer;
  }

  .paginationItem span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .prev,
  .next {
    background: #fff;
    border: none;
    padding: 10px;
    color: blue;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
    margin: 0 10px;
    cursor: pointer;
    border-radius: 10px;
  }

  .paginationItem.active {
    border: 1px solid #888;
    color: #888;
    pointer-events: none;
  }

  .prev.disabled,
  .next.disabled {
    pointer-events: none;
    box-shadow: none;
    color: #999;
  }
`;

const PaginationNav = ({ totalCount, pageLimit, dataLimit, setOffset }) => {
  const pages = Number(Math.ceil(totalCount / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setOffset(currentPage);
  }, [currentPage]);
  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };
  const changePage = (item) => {
    setCurrentPage(item);
  };
  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };
  const getPaginationGroup = () => {
    let arr = [];
    if (pages > pageLimit) {
      let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
      return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    }
    for (let i = 1; i <= pages; i++) {
      arr.push(i);
    }
    return arr;
  };
  return (
    <PaginationView>
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={() => goToPreviousPage()}
          className={`prev ${currentPage === 1 || !pages ? "disabled" : ""}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map(
          (item, index) =>
            item && (
              <button
                key={index}
                onClick={() => changePage(item)}
                className={`paginationItem ${
                  item === currentPage ? "active" : null
                }`}
              >
                <span>{item}</span>
              </button>
            )
        )}

        {/* next button */}
        <button
          onClick={() => goToNextPage()}
          className={`next ${
            currentPage === pages || !pages ? "disabled" : ""
          }`}
        >
          next
        </button>
      </div>
    </PaginationView>
  );
};

export default PaginationNav;
