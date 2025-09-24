export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  startIndex,
  endIndex,
}) {
  const pageSizes = [10, 25, 50, 100];

  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-neutral-700">
        Showing {startIndex + 1} to {endIndex} of {totalItems} users
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-neutral-700 sm:inline">Show:</span>
          <select
            className="w-28 rounded-md border border-neutral-300 bg-white px-2 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={pageSize}
            onChange={(e) => onPageSizeChange(+e.target.value)}
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-neutral-300 disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="min-w-[7rem] text-center text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm transition hover:bg-neutral-300 disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
