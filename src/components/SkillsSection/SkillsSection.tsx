import { useLayoutEffect, useRef } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import { gsap } from "@/lib/gsap/gsap-plugins";
import { SKILL_GROUPS } from "./_constants/skill-groups.constants";
import { SkillGroup } from "./_partials/SkillGroup";

export const SkillsSection = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const railFill = railFillRef.current;
    if (!wrap || !railFill) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        railFill,
        { height: 0 },
        {
          height: () => wrap.offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 62%",
            end: "bottom 62%",
            scrub: 0.8,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-skillgroup]", wrap).forEach((group) => {
        const dot = group.querySelector("[data-skilldot]");
        const title = group.querySelector("[data-skillgroup-title]");
        const items = group.querySelectorAll("[data-skillgroup-item]");

        gsap.set(dot, { scale: 0 });
        gsap.set(title, { opacity: 0, x: -12 });
        gsap.set(items, { opacity: 0.05, filter: "blur(5px)", y: 12 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power2.out" },
        });

        tl.to(dot, { scale: 1, duration: 0.5 })
          .to(title, { opacity: 1, x: 0, duration: 0.55 }, 0.1)
          .to(items, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.7, stagger: 0.035 }, 0.15);
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="experience__section skills">
      <div className="experience__container">
        <SectionHeading
          sectionNumber={3}
          label="Skills"
          rows={["The toolset,", "category by category."]}
          className="skills__heading"
        />
        <div className="skills__wrap" ref={wrapRef}>
          <span className="skills__rail" />
          <span className="skills__rail-fill" ref={railFillRef} />
          {SKILL_GROUPS.map((group) => (
            <SkillGroup key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
};
