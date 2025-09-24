import { parseName } from "./helpers";

export default function UsersTable({
  users,
  onSort,
  renderSortIndicator,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-auto rounded-xl">
      <table className="w-full border-separate border-spacing-0">
        <thead className="bg-neutral-50 text-neutral-700">
          <tr>
            {[
              { key: "id", label: "ID" },
              { key: "firstName", label: "First Name" },
              { key: "lastName", label: "Last Name" },
              { key: "email", label: "Email" },
              { key: "department", label: "Department" },
            ].map((col) => (
              <th
                key={col.key}
                onClick={() => onSort(col.key)}
                className="sticky top-0 z-10 cursor-pointer select-none border-b border-neutral-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide sm:px-4 sm:py-3"
              >
                <span className="inline-flex items-center">
                  {col.label}
                  <span className="ml-1">{renderSortIndicator(col.key)}</span>
                </span>
              </th>
            ))}
            <th className="sticky top-0 z-10 border-b border-neutral-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide sm:px-4 sm:py-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, idx) => {
            const { firstName, lastName } = parseName(user.name);
            return (
              <tr
                key={user.id}
                className={`border-b border-neutral-200 transition hover:bg-blue-50/40 ${
                  idx % 2 === 1 ? "bg-neutral-50/40" : "bg-white"
                }`}
              >
                <td className="px-3 py-2 text-sm text-neutral-900 sm:px-4 sm:py-3">
                  {user.id}
                </td>
                <td className="px-3 py-2 text-sm text-neutral-900 sm:px-4 sm:py-3">
                  {firstName}
                </td>
                <td className="px-3 py-2 text-sm text-neutral-900 sm:px-4 sm:py-3">
                  {lastName}
                </td>
                <td className="px-3 py-2 text-sm text-neutral-700 sm:px-4 sm:py-3">
                  {user.email}
                </td>
                <td className="px-3 py-2 text-sm text-neutral-700 sm:px-4 sm:py-3">
                  {user.company?.name || "N/A"}
                </td>
                <td className="px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-md border border-blue-200 bg-white px-2.5 py-1.5 text-xs font-medium text-blue-700 shadow-sm transition hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => onEdit(user)}
                      title="Edit user"
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-700 shadow-sm transition hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-400"
                      onClick={() => onDelete(user)}
                      title="Delete user"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
