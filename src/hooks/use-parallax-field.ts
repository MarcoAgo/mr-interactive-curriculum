import { useEffect } from "react";

interface TJitterPoint {
  x: number;
  y: number;
}

/**
 * Drives two decorative-only motion layers with a single rAF loop:
 * `[data-drift]` elements get a gentle scroll parallax based on their own
 * viewport position, `[data-shape]` elements additionally get scroll-depth
 * parallax plus a soft cursor-jitter nudge while the pointer moves over `[data-hero]`.
 */
export const useParallaxField = () => {
  useEffect(() => {
    const shapes = Array.from(document.querySelectorAll<HTMLElement>("[data-shape]"));
    const drifts = Array.from(document.querySelectorAll<HTMLElement>("[data-drift]"));

    const jitter: TJitterPoint[] = shapes.map(() => ({ x: 0, y: 0 }));
    const current: TJitterPoint[] = shapes.map(() => ({ x: 0, y: 0 }));

    let curScroll = window.scrollY;
    let rafId = 0;

    const loop = () => {
      rafId = requestAnimationFrame(loop);
      curScroll += (window.scrollY - curScroll) * 0.08;

      drifts.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.08;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });

      shapes.forEach((el, i) => {
        const depth = parseFloat(el.getAttribute("data-depth") ?? "0.5") || 0.5;
        const target = jitter[i] ?? { x: 0, y: 0 };
        const cur = current[i];
        if (!cur) return;
        cur.x += (target.x - cur.x) * 0.05;
        cur.y += (target.y - cur.y) * 0.05;
        el.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${(cur.y - curScroll * depth * 0.34).toFixed(2)}px, 0)`;
      });
    };
    loop();

    const hero = document.querySelector<HTMLElement>("[data-hero]");
    let lastJitter = 0;
    const onPointerMove = () => {
      const now = Date.now();
      if (now - lastJitter < 480) return;
      lastJitter = now;
      const amp = 40;
      shapes.forEach((_, i) => {
        const j = jitter[i];
        if (!j) return;
        j.x = (Math.random() * 2 - 1) * amp;
        j.y = (Math.random() * 2 - 1) * amp;
      });
    };
    hero?.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(rafId);
      hero?.removeEventListener("pointermove", onPointerMove);
    };
  }, []);
};
