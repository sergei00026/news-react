import s from "./pagination.module.scss"

export type Props = {
  totalCount: number
  currentPage: number
  setCurrentPage: (num: number) => void
}
export const Pagination = ({totalCount, currentPage, setCurrentPage}: Props) => {

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }
  const handleNextPage = () => {
    if (currentPage < totalCount) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }


  return (
    <div className={s.pagination}>
      <button
        onClick={handlePrevPage}
        className={s.button} disabled={currentPage === 1}>&lt;</button>
      {[...Array(totalCount)].map((_, index) => {
        return (
          <button
            onClick={()=>handlePageChange(index + 1)}
            key={index}
            className={s.button}
            disabled={index + 1 === currentPage}
          >
            {index + 1}
          </button>
        )
      })}
      <button
        onClick={handleNextPage}
        className={s.button}
        disabled={currentPage === totalCount}>&gt;</button>
    </div>
  );
};