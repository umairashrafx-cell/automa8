import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Gentle fade-and-rise on first scroll into view. Honours reduced motion via <MotionConfig>. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  ...aria
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
  "aria-labelledby"?: string;
}) {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...aria}
    >
      {children}
    </Component>
  );
}
