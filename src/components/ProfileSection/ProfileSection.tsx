import { useRef } from "react";
import { FloatingShape } from "@/components/FloatingShape";
import { SectionHeading } from "@/components/SectionHeading";
import { useLineReveal } from "@/hooks/use-line-reveal";
import { PROFILE_PARAGRAPHS } from "./_constants/profile-copy.constants";

export const ProfileSection = () => {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  useLineReveal(bodyRef, "p");

  return (
    <section id="profile" className="experience__section profile">
      <div className="experience__container profile__container">
        <div className="profile__aside">
          <div className="profile__sticky">
            <SectionHeading sectionNumber={1} label="Profile" rows={["Eight years", "of frontend."]} />
            <FloatingShape
              variant="squircle"
              motion="orbit"
              duration="21s"
              reverse
              size="lg"
              opacity={0.6}
              parallax="scroll"
              className="profile__drift"
            />
          </div>
        </div>

        <div className="profile__body" ref={bodyRef}>
          <p className="profile__lead">{PROFILE_PARAGRAPHS[0]}</p>
          <p className="profile__text">{PROFILE_PARAGRAPHS[1]}</p>
          <p className="profile__text">{PROFILE_PARAGRAPHS[2]}</p>
        </div>
      </div>
    </section>
  );
};
