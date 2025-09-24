export default function HeaderControls({
  searchQuery, onSearch,
  filters, onFilterChange,
  showFilterPanel, onToggleFilterPanel,
  onOpenAdd,
  FilterPanelComponent
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users..."
            className="h-11 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="relative flex-none">
          <button
            className={`inline-flex h-11 items-center gap-2 rounded-md border px-3 text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-200 ${
              showFilterPanel
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50"
            }`}
            onClick={onToggleFilterPanel}
          >
            <span>Filters</span>
            <svg width="16" height="16" viewBox="0 0 20 20" className="opacity-70">
              <path fill="currentColor" d="M3 5h14l-5.5 6.3v3.7l-3 1v-4.7z" />
            </svg>
          </button>

          <FilterPanelComponent
            filters={filters}
            onFilterChange={onFilterChange}
            onClose={onToggleFilterPanel}
            isOpen={showFilterPanel}
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-end sm:w-auto">
        <button
          className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={onOpenAdd}
        >
          Add User
        </button>
      </div>
    </div>
  );
}
