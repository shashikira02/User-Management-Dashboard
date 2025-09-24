export default function LoadingSpinner() {
  return (
    <div className="grid place-items-center p-12">
      <div
        aria-label="Loading"
        className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-blue-600"
      />
    </div>
  );
}
