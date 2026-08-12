import { useLayoutEffect, useRef } from "react";
import { FloatingShape } from "@/components/FloatingShape";
import { SectionHeading } from "@/components/SectionHeading";
import { useBlockReveal } from "@/hooks/use-block-reveal";
import { gsap } from "@/lib/gsap/gsap-plugins";
import { EDUCATION_ITEMS, LANGUAGE_ITEMS } from "./_constants/education-items.constants";
import { EducationHistoryBlock } from "./_partials/EducationHistoryBlock";
import { LanguageRow } from "./_partials/LanguageRow";

export const EducationSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useBlockReveal(containerRef);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-langbar]", container).forEach((bar) => {
        const percent = parseFloat(bar.getAttribute("data-langbar") ?? "0") / 100;
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(bar, {
          scaleX: percent,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar.closest("[data-lang]") ?? bar,
            start: "top 85%",
            end: "top 55%",
            scrub: 0.8,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="experience__section experience__section--raised education">
      <FloatingShape
        variant="triangle"
        motion="spin-slow"
        duration="40s"
        opacity={0.77}
        parallax="scroll"
        className="education__drift"
      />

      <div className="experience__container" ref={containerRef}>
        <SectionHeading
          sectionNumber={4}
          label="Education & languages"
          rows={["Where", "it started."]}
          className="education__heading"
        />

        <div className="education__grid">
          <div className="education__history">
            {EDUCATION_ITEMS.map((item) => (
              <EducationHistoryBlock key={item.title} item={item} />
            ))}
          </div>

          <div className="education__languages">
            <span className="education__languages-label">Languages</span>
            {LANGUAGE_ITEMS.map((language) => (
              <LanguageRow key={language.name} language={language} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
