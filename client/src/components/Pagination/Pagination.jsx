import React from "react";
import "./pagination.css";

export default function Pagination({
  games,
  itemsPerPage,
  handlePage,
  currentPage,
}) {
  let pages = [];
  let pagesAmount = Math.ceil(games.length / itemsPerPage);
  for (let i = 1; i < pagesAmount + 1; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1 ? true : false}
        className="button"
      >{`<<`}</button>

      {pages.length
        ? pages.map((n) => {
            return (
              <button
                key={n}
                onClick={() => handlePage(n)}
                className={n !== currentPage ? "button" : "buttonSelected"}
              >
                {n}
              </button>
            );
          })
        : null}
      <button
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === pagesAmount ? true : false}
        className="button"
      >
        {`>>`}
      </button>
    </div>
  );
}
