import { useLayoutEffect, useRef } from "react";
import { FloatingShape } from "@/components/FloatingShape";
import { SectionHeading } from "@/components/SectionHeading";
import { gsap } from "@/lib/gsap/gsap-plugins";
import { EXPERIENCE_ITEMS } from "./_constants/experience-items.constants";
import { ExperienceTimelineCard } from "./_partials/ExperienceTimelineCard";

const CARD_REVEAL_SELECTOR =
  ".timeline-card__top, .timeline-card__role, .timeline-card__org, .timeline-card__description";

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

      const horizontalTween = gsap.to(track, {
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
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".timeline-card", track).forEach((card) => {
        const kids = card.querySelectorAll(CARD_REVEAL_SELECTOR);
        gsap.set(kids, { opacity: 0.05, filter: "blur(5px)", y: 14 });
        gsap.to(kids, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            containerAnimation: horizontalTween,
            trigger: card,
            start: "left 78%",
            end: "left 35%",
            scrub: 0.6,
          },
        });
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
          <div className="timeline__track" ref={trackRef}>
            {EXPERIENCE_ITEMS.map((item, i) => (
              <ExperienceTimelineCard key={item.company + item.period} item={item} delay={`${0.55 + i * 0.55}s`} />
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
