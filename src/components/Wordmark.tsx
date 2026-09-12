export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[17px] font-semibold tracking-[0.2em] text-foreground ${className}`}>
      AUTOMA<span className="text-brand">8</span>
    </span>
  );
}
