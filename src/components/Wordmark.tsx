/**
 * The official Automa8 wordmark (brand kit v1.0, light-surface version): slate letters,
 * teal loop, copper node. Keep it at least 120px wide and never recolour or add effects.
 */
export function Wordmark({ height = 26, className = "" }: { height?: number; className?: string }) {
  const width = Math.round((height * 4200) / 812);
  return (
    <img
      src="/logo/automa8-wordmark-light.svg"
      alt="Automa8"
      width={width}
      height={height}
      className={`block w-auto ${className}`}
      style={{ height }}
    />
  );
}
