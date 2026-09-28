const PETAL_COUNT = 9;

export function Petals({ className }: { className?: string }) {
  return (
    <div className={`petal-field ${className ?? ''}`} aria-hidden="true">
      {Array.from({ length: PETAL_COUNT }).map((_, index) => (
        <span key={index} className="petal" />
      ))}
    </div>
  );
}
