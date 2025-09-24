export default function DeleteConfirmation({ isOpen, onClose, onConfirm, user, isLoading }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-3">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between bg-neutral-50 px-4 py-3">
          <h2 className="text-lg font-semibold text-neutral-900">Confirm Delete</h2>
          <button
            className="rounded p-1 text-xl leading-none text-neutral-700 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-4">
          <p className="text-sm text-neutral-900">
            Are you sure you want to delete <strong>{user.name}</strong>?
          </p>
          <p className="mt-2 text-sm text-neutral-700">This action cannot be undone.</p>
        </div>

        <div className="flex items-center justify-end gap-2 bg-neutral-50 px-4 py-3">
          <button
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 shadow-sm transition hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete User"}
          </button>
        </div>
      </div>
    </div>
  );
}
