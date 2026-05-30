import { useLayoutEffect, useRef } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * GSAP entrance animation wrapper.
 *
 * - staggerChildren (default true): fades/slides in each DIRECT child in
 *   sequence — ideal for a page made of sections (header, stats, table…).
 * - staggerChildren false: animates the wrapper itself as one block.
 *
 * Uses gsap.from + clearProps so the natural (visible) state is the default —
 * if JS/GSAP ever fails to run, content is NOT left hidden. Honors
 * prefers-reduced-motion. Re-mount (via a `key`) to replay on route change.
 */
export default function Reveal({
  children,
  y = 18,
  duration = 0.55,
  delay = 0,
  stagger = 0.09,
  staggerChildren = true,
  sx,
  ...props
}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;

    const ctx = gsap.context(() => {
      const targets = staggerChildren ? el.children : el;
      if (staggerChildren && (!targets || targets.length === 0)) return;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: "power2.out",
        stagger: staggerChildren ? stagger : 0,
        clearProps: "opacity,transform",
      });
    }, ref);

    return () => ctx.revert();
  }, []); // replay handled by remounting via `key`

  return (
    <Box ref={ref} sx={sx} {...props}>
      {children}
    </Box>
  );
}
