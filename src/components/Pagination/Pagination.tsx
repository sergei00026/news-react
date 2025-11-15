import s from "./pagination.module.scss"

export type Props = {
  totalCount: number
  currentPage: number;

  // кнопка Next
  onNext: () => void;

  // кнопка Prev
  onPrev: () => void;

  goToPage: (n: number) => void;

  hasNext: boolean;
  hasPrev: boolean;
}
export const Pagination = ({totalCount, onNext, onPrev,  goToPage, currentPage}: Props) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalCount

  return (
    <div className={s.pagination}>
      <button
        onClick={onPrev}
        className={s.button} disabled={isFirstPage}>&lt;</button>
      {[...Array(totalCount)].map((_, index) => {
        const pageNum = index + 1;
        const isActive = pageNum === currentPage;


        return (
          <button
            key={index}
            className={`${s.button} ${pageNum === currentPage ? s.active : ""}`}
            onClick={() => goToPage(pageNum)}
            disabled={isActive}
          >
            {pageNum}
          </button>
        );
      })}


      <button
        onClick={onNext}
        className={s.button}
        disabled={isLastPage}
      >&gt;</button>
    </div>
  );
};