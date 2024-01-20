type Props = {
  /** 현재 사용자가 보고 있는 페이지 */
  currentPage: number
  /** 전체 항목의 갯수 (단, 한 페이지는 10개의 항목을 가지고 있어야 한다) */
  count: number
  /** 사용자가 페이지를 변경하였을때 호출할 콜백 함수 */
  handlePageChange: (pageNumber: number) => void
}

const btnClassName =
  'border border-slate-300 px-2 py-2 flex justify-center items-center leading-none disabled:opacity-30 hover:bg-slate-200'

export default function Pagination({
  currentPage,
  count,
  handlePageChange,
}: Props) {
  const totalPage = Math.ceil(count / 10)
  const startPageIndex = Math.max(1, Math.min(totalPage - 4, currentPage - 2))
  const endPageIndex = Math.min(startPageIndex + 4, totalPage)

  if (totalPage < 2) {
    return null
  }

  return (
    <div className="flex gap-1 my-3">
      <button
        className={btnClassName}
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        이전
      </button>
      {Array.from({ length: endPageIndex - startPageIndex + 1 }).map(
        (_, idx) => {
          const pageIndex = startPageIndex + idx

          return (
            <button
              className={btnClassName}
              key={pageIndex}
              disabled={pageIndex === currentPage}
              onClick={() => handlePageChange(pageIndex)}
            >
              {pageIndex}
            </button>
          )
        },
      )}
      <button
        className={btnClassName}
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        다음
      </button>
    </div>
  )
}
