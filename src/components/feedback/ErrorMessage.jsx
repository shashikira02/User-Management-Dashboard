export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-red-800">
      <p className="m-0 text-sm">{message}</p>
      {onRetry && (
        <button
          className="ml-auto inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
