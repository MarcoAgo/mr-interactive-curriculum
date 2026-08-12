import { useRef } from "react";
import { FloatingShape } from "@/components/FloatingShape";
import { SectionHeading } from "@/components/SectionHeading";
import { useBlockReveal } from "@/hooks/use-block-reveal";
import { STRENGTH_ITEMS } from "./_constants/strength-items.constants";
import { StrengthCard } from "./_partials/StrengthCard";

export const StrengthsSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useBlockReveal(containerRef);

  return (
    <section id="strengths" className="experience__section strengths">
      <FloatingShape
        variant="square"
        motion="bob"
        duration="15s"
        size="md"
        opacity={0.45}
        parallax="scroll"
        className="strengths__drift"
      />

      <div className="experience__container" ref={containerRef}>
        <SectionHeading
          sectionNumber={5}
          label="How I work"
          rows={["Three habits", "that travel."]}
          className="strengths__heading"
        />

        <div className="strengths__grid">
          {STRENGTH_ITEMS.map((item) => (
            <StrengthCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
