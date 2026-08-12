import { useRef } from "react";
import { FloatingShape } from "@/components/FloatingShape";
import { SectionHeading } from "@/components/SectionHeading";
import { useBlockReveal } from "@/hooks/use-block-reveal";
import { CONTACT_CARDS } from "./_constants/contact-cards.constants";
import { ContactCard } from "./_partials/ContactCard";

const CV_FILE_PATH = "/Marco-Agostinelli-CV.pdf";
const CV_FILE_NAME = "Marco-Agostinelli-CV.pdf";

export const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useBlockReveal(containerRef);

  return (
    <section id="contact" className="experience__section experience__section--raised contact">
      <FloatingShape
        variant="ring"
        motion="orbit"
        duration="24s"
        size="xl"
        opacity={0.4}
        parallax="scroll"
        className="contact__drift"
      />

      <div className="experience__container" ref={containerRef}>
        <SectionHeading
          sectionNumber={6}
          label="Contact"
          rows={["Let's talk about", "your frontend."]}
          size="lg"
          className="contact__heading"
        />

        <div className="contact__rows">
          <div className="contact__row contact__row--primary" data-para-block>
            {CONTACT_CARDS.filter((card) => card.row === 1).map((card) => (
              <ContactCard key={card.eyebrow} card={card} />
            ))}
          </div>
          <div className="contact__row contact__row--secondary" data-para-block>
            {CONTACT_CARDS.filter((card) => card.row === 2).map((card) => (
              <ContactCard key={card.eyebrow} card={card} />
            ))}
          </div>
        </div>

        <div className="contact__cta">
          <a className="contact__download" href={CV_FILE_PATH} download={CV_FILE_NAME}>
            Download CV (PDF)
          </a>
        </div>

        <p className="contact__legal">
          I authorise the processing of the personal data contained in this CV pursuant to art. 13 of
          Italian Legislative Decree 196/2003 and art. 13 of GDPR 679/2016.
        </p>
      </div>
    </section>
  );
};
