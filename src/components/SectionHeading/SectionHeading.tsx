import classNames from "classnames";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/gsap-plugins";
import { SectionHeadingRollDigit } from "./_partials/SectionHeadingRollDigit";
import type { SectionHeadingProps } from "./SectionHeading.types";

export const SectionHeading = ({
  sectionNumber,
  label,
  rows,
  size = "md",
  className,
}: SectionHeadingProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const dotEl = root.querySelector(".section-heading__dot");
      const labelEl = root.querySelector(".section-heading__label");
      const ruleEl = root.querySelector(".section-heading__rule");
      const trackEls = root.querySelectorAll(".section-heading__roll-track");
      const charEls = root.querySelectorAll(".section-heading__char");

      gsap.set([dotEl, labelEl, ruleEl], { opacity: 0 });
      gsap.set(dotEl, { scale: 0 });
      gsap.set(labelEl, { x: -10 });
      gsap.set(ruleEl, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(trackEls, { y: 0 });
      gsap.set(charEls, { opacity: 0, y: "0.4em" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(dotEl, { opacity: 1, scale: 1, duration: 0.5 })
        .to(
          trackEls,
          {
            y: (_i, target) => `-${(target as HTMLElement).children.length - 1}em`,
            duration: 1,
            ease: "power3.inOut",
            stagger: 0.22,
          },
          0.1,
        )
        .to(labelEl, { opacity: 1, x: 0, duration: 0.6 }, 0.5)
        .to(ruleEl, { opacity: 1, scaleX: 1, duration: 0.8 }, 0.6)
        .to(charEls, { opacity: 1, y: 0, duration: 0.65, stagger: 0.022 }, 0.55);
    }, root);

    return () => ctx.revert();
  }, [rows, label, sectionNumber]);

  const tens = Math.floor(sectionNumber / 10) % 10;
  const ones = sectionNumber % 10;

  return (
    <div className={classNames("section-heading", className)} ref={rootRef}>
      <span className="section-heading__eyebrow">
        <span className="section-heading__dot" />
        <span className="section-heading__counter">
          <SectionHeadingRollDigit target={tens} />
          <SectionHeadingRollDigit target={ones} />
        </span>
        <span className="section-heading__label">{`/ ${label}`}</span>
        <span className="section-heading__rule" />
      </span>
      <h2 className={classNames("section-heading__title", `section-heading__title--${size}`)}>
        {rows.map((row, ri) => (
          <span className="section-heading__row" key={row}>
            {Array.from(row).map((ch, ci) => (
              <span className="section-heading__char" key={`${ri}-${ci}`}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </span>
        ))}
      </h2>
    </div>
  );
};
