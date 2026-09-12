type Props = {
  domain: string;
  imageBase: string;
  alt: string;
  /** `sizes` attribute for the responsive screenshot. */
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

/** A real screenshot of a live project, presented inside a minimal browser window. */
export function BrowserFrame({
  domain,
  imageBase,
  alt,
  sizes,
  priority,
  className = "",
  imgClassName = "",
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line-strong bg-surface-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex h-8 items-center gap-3 border-b border-line bg-surface px-3" aria-hidden>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto max-w-[60%] truncate rounded-md bg-white/[0.06] px-3 py-0.5 text-[11px] text-text-faint">
          {domain}
        </div>
        <div className="w-[42px]" />
      </div>
      <div className="relative aspect-[1440/860] overflow-hidden">
        <img
          src={`${imageBase}-800.jpg`}
          srcSet={`${imageBase}-800.jpg 800w, ${imageBase}-1440.jpg 1440w`}
          sizes={sizes}
          width={1440}
          height={860}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={`h-full w-full object-cover object-top ${imgClassName}`}
        />
      </div>
    </div>
  );
}
