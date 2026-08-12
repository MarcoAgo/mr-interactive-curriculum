import { useLayoutEffect, useRef } from "react";
import { ContactSection } from "@/components/ContactSection";
import { EducationSection } from "@/components/EducationSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { HeroSection } from "@/components/HeroSection";
import { ProfileSection } from "@/components/ProfileSection";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { ShaderBackground } from "@/components/ShaderBackground";
import { SkillsSection } from "@/components/SkillsSection";
import { StrengthsSection } from "@/components/StrengthsSection";
import { useParallaxField } from "@/hooks/use-parallax-field";
import { ScrollSmoother } from "@/lib/gsap/gsap-plugins";

export const Home = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useParallaxField();

  useLayoutEffect(() => {
    document.body.style.background = "#0a0a0b";

    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.4,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    return () => {
      smoother.kill();
      document.body.style.background = "";
    };
  }, []);

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <ShaderBackground />
      <ScrollProgressBar />
      <div ref={contentRef} id="smooth-content" className="experience">
        <HeroSection />
        <ProfileSection />
        <ExperienceTimeline />
        <SkillsSection />
        <EducationSection />
        <StrengthsSection />
        <ContactSection />
      </div>
    </div>
  );
};
