import { useLayoutEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "@/lib/gsap/gsap-plugins";

/**
 * Reveals each `itemSelector` child of every `blockSelector` element as one
 * atomic unit (blur + opacity + lift), staggered within its block, the first
 * time that block crosses into view. Shared by Education and Strengths.
 */
export const useBlockReveal = (
  containerRef: RefObject<HTMLElement | null>,
  blockSelector = "[data-para-block]",
  itemSelector = "[data-para]",
) => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(blockSelector, container).forEach((block) => {
        const items = block.querySelectorAll(itemSelector);
        if (!items.length) return;

        gsap.set(items, { opacity: 0.05, filter: "blur(5px)", y: 14 });
        gsap.to(items, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, blockSelector, itemSelector]);
};
