export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-[17px] font-semibold tracking-[0.18em] text-text ${className}`}
    >
      AUTOMA<span className="text-brand">8</span>
    </span>
  );
}
