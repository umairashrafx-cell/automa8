import { shotSources, type Shot } from "@/lib/projects";

/**
 * A real screenshot of client work: thin border, 18px radius, soft shadow.
 * Pass `hover` when the image sits inside a `group` link so it scales slightly on hover.
 */
export function ProjectImage({
  shot,
  sizes,
  priority,
  hover,
  className = "",
}: {
  shot: Shot;
  sizes: string;
  priority?: boolean;
  hover?: boolean;
  className?: string;
}) {
  const { src, srcSet, width, height } = shotSources(shot);
  return (
    <div className={`shot ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        alt={shot.alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={`h-full w-full object-cover object-top ${
          hover ? "transition-transform duration-[400ms] ease-out group-hover:scale-[1.015]" : ""
        }`}
      />
    </div>
  );
}
