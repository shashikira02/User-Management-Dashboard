import { useEffect, useState } from "react";

export default function FilterPanel({
  filters,
  onFilterChange,
  onClose,
  isOpen,
}) {
  const [localFilters, setLocalFilters] = useState(filters);
  useEffect(() => setLocalFilters(filters), [filters]);

  function handleChange(key, value) {
    setLocalFilters((p) => ({ ...p, [key]: value }));
  }
  function handleApply() {
    onFilterChange(localFilters);
    onClose();
  }
  function handleClear() {
    const cleared = { firstName: "", lastName: "", email: "", department: "" };
    setLocalFilters(cleared);
    onFilterChange(cleared);
  }
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-11 z-30 w-[min(92vw,22rem)] rounded-lg border border-neutral-200 bg-white/95 p-3 shadow-xl backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-900">
          Filter Users
        </h3>
        <button
          className="rounded p-1 text-xl leading-none text-neutral-700 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={onClose}
          aria-label="Close filter panel"
        >
          ×
        </button>
      </div>

      {[
        {
          key: "firstName",
          label: "First Name",
          placeholder: "Filter by first name",
        },
        {
          key: "lastName",
          label: "Last Name",
          placeholder: "Filter by last name",
        },
        { key: "email", label: "Email", placeholder: "Filter by email" },
        {
          key: "department",
          label: "Department",
          placeholder: "Filter by department",
        },
      ].map((data) => (
        <div key={data.key} className="mb-2">
          <label className="mb-1 block text-xs font-medium text-neutral-700">
            {data.label}
          </label>
          <input
            type="text"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            value={localFilters[data.key]}
            onChange={(e) => handleChange(data.key, e.target.value)}
            placeholder={data.placeholder}
          />
        </div>
      ))}

      <div className="mt-3 flex items-center justify-between">
        <button
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-800 shadow-sm hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
          onClick={handleClear}
        >
          Clear All
        </button>
        <button
          className="rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleApply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
