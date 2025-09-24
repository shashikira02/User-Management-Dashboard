export default function EmptyState({ title, message }) {
  return (
    <div className="grid place-items-center px-4 py-12 text-center sm:py-16">
      <div className="max-w-md">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm text-neutral-600">{message}</p>
      </div>
    </div>
  );
}
