export default function LazySpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {/* For TSX uncomment the commented types below */}
      <div
        className="radial-progress bg-(--primary-color) text-primary-content border-(--primary-color) border-4"
        style={{ "--value": 100 } /* as React.CSSProperties */}
        aria-valuenow={100}
        role="progressbar"
      >
        100%
      </div>
    </div>
  );
}
