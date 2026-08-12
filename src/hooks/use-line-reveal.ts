import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { SplitText, gsap } from "@/lib/gsap/gsap-plugins";

/**
 * Splits every element matching `selector` inside `containerRef` into lines
 * and reveals each line (blur + opacity + lift) as it drifts through a
 * gentle scroll-scrubbed focus band, so long copy reads in as you scroll to it.
 */
export const useLineReveal = (containerRef: RefObject<HTMLElement | null>, selector: string) => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(container.querySelectorAll<HTMLElement>(selector));
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(targets, { type: "lines", linesClass: "reveal-line" });

      gsap.set(split.lines, { opacity: 0.05, filter: "blur(6px)", y: 12 });

      split.lines.forEach((line) => {
        gsap.to(line, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            end: "top 55%",
            scrub: 0.7,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, selector]);
};
