type Props = {
  domain: string;
  imageBase: string;
  alt: string;
  /** `sizes` attribute for the responsive screenshot. */
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Classes for the image viewport, e.g. an aspect ratio. */
  viewportClassName?: string;
  imgClassName?: string;
};

/** A real screenshot of a live project, presented inside a minimal light browser window. */
export function BrowserFrame({
  domain,
  imageBase,
  alt,
  sizes,
  priority,
  className = "",
  viewportClassName = "aspect-[1440/860]",
  imgClassName = "",
}: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(17,17,17,0.04),0_24px_48px_-24px_rgba(17,17,17,0.18)] ${className}`}
    >
      <div
        className="flex h-9 items-center gap-3 border-b border-border bg-card px-3.5"
        aria-hidden
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8e8e5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8e8e5]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e8e8e5]" />
        </div>
        <div className="mx-auto max-w-[60%] truncate rounded-md bg-muted px-3 py-1 text-[11px] text-muted-foreground">
          {domain}
        </div>
        <div className="w-[42px]" />
      </div>
      <div className={`relative overflow-hidden bg-muted ${viewportClassName}`}>
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
          className={`h-full w-full object-cover object-left-top ${imgClassName}`}
        />
      </div>
    </div>
  );
}
