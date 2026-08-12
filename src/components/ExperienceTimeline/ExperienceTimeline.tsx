import { useLayoutEffect, useRef } from "react";
import { FloatingShape } from "@/components/FloatingShape";
import { SectionHeading } from "@/components/SectionHeading";
import { gsap } from "@/lib/gsap/gsap-plugins";
import { EXPERIENCE_ITEMS } from "./_constants/experience-items.constants";
import { computeCardFocus, computeChildFocus } from "./_helpers/rail-focus.helpers";
import { ExperienceTimelineRailItem } from "./_partials/ExperienceTimelineRailItem";

const VIOLET_RGB = "138,124,255";
const CYAN_RGB = "111,227,208";

export const ExperienceTimeline = () => {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const pinEl = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!pinEl || !viewport || !track) return;

    const ctx = gsap.context(() => {
      const getDistance = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);

      const runFocusPass = () => {
        const viewportRect = viewport.getBoundingClientRect();
        const viewportWidth = viewportRect.width;
        const items = gsap.utils.toArray<HTMLElement>("[data-rail-item]", track);

        const measured = items.map((item) => ({
          item,
          rect: item.getBoundingClientRect(),
          intern: item.classList.contains("rail-item--alt"),
        }));

        measured.forEach(({ item, rect, intern }) => {
          const cardCenterX = rect.left + rect.width / 2;
          const t = computeCardFocus(cardCenterX, viewportWidth);
          const rgb = intern ? CYAN_RGB : VIOLET_RGB;

          const kids = Array.from(item.children) as HTMLElement[];
          kids.forEach((kid, i) => {
            const q = computeChildFocus(t, i);
            gsap.set(kid, {
              opacity: 0.05 + q * 0.95,
              filter: `blur(${((1 - q) * 5).toFixed(2)}px)`,
              y: (1 - q) * 14,
            });
          });

          const node = item.querySelector<HTMLElement>("[data-node]");
          if (node) {
            gsap.set(node, {
              scale: 0.55 + t * 0.95,
              boxShadow: `0 0 ${(5 + t * 22).toFixed(1)}px ${(1 + t * 3).toFixed(1)}px rgba(${rgb},${(0.18 + t * 0.5).toFixed(3)})`,
            });
          }

          const role = item.querySelector<HTMLElement>("[data-role]");
          if (role) {
            gsap.set(role, {
              textShadow: t > 0.04 ? `0 0 ${(t * 24).toFixed(1)}px rgba(${rgb},${(t * 0.5).toFixed(3)})` : "none",
            });
          }
        });
      };

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progress) gsap.set(progress, { scaleX: self.progress });
            runFocusPass();
          },
          onRefresh: runFocusPass,
        },
      });
    }, pinEl);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience__section timeline">
      <div className="timeline__inner" ref={pinRef}>
        <div className="timeline__head">
          <SectionHeading sectionNumber={2} label="Experience" rows={["Seven", "chapters."]} size="sm" />
          <FloatingShape
            variant="ring"
            motion="bob"
            duration="13s"
            size="sm"
            opacity={0.6}
            className="timeline__head-shape"
          />
        </div>

        <div className="timeline__viewport" ref={viewportRef}>
          <span className="rail__line" />
          <span className="rail__glow" />
          <div className="timeline__track" ref={trackRef}>
            {EXPERIENCE_ITEMS.map((item) => (
              <ExperienceTimelineRailItem key={item.index} item={item} />
            ))}
          </div>
        </div>

        <div className="timeline__footer">
          <span className="timeline__footer-label">2016 → today</span>
          <span className="timeline__progress-track">
            <span className="timeline__progress-fill" ref={progressRef} />
          </span>
          <span className="timeline__footer-label">Scroll →</span>
        </div>
      </div>
    </section>
  );
};
