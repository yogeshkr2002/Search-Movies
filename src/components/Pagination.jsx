import "./style.css";

const Pagination = ({ totalItems, itemsPerPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="pageBox">
        <span>Pages : </span>
        {pages.map((page, index) => {
          return (
            <button key={index} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
