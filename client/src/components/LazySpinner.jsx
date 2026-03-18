export default function LazySpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div
        className="radial-progress bg-(--primary-color) text-primary-content border-(--primary-color) border-4"
        style={{ "--value": 100 }}
        aria-valuenow={100}
        role="progressbar"
      >
        100%
      </div>
    </div>
  );
}
