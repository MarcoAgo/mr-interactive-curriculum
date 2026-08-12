import { useRef } from "react";
import { FiMapPin } from "react-icons/fi";
import { FloatingShape } from "@/components/FloatingShape";
import { SectionHeading } from "@/components/SectionHeading";
import { useBlockReveal } from "@/hooks/use-block-reveal";
import { CONTACT_CARDS } from "./_constants/contact-cards.constants";
import { ContactCard } from "./_partials/ContactCard";

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

        <div className="contact__grid" data-para-block>
          {CONTACT_CARDS.map((card) => (
            <ContactCard key={card.eyebrow} card={card} />
          ))}

          <div className="contact__location" data-para>
            <span className="contact__location-main">
              <span className="contact__location-icon">
                <FiMapPin size={20} />
              </span>
              <span className="contact__location-text">
                <span className="contact__location-label">Based in</span>
                <span className="contact__location-value">Verona, Italy</span>
              </span>
            </span>
            <span className="contact__location-remote">Available remote</span>
          </div>
        </div>

        <div className="contact__cta">
          <button type="button" className="contact__download" onClick={() => window.print()}>
            Download CV (PDF)
          </button>
        </div>

        <p className="contact__legal">
          I authorise the processing of the personal data contained in this CV pursuant to art. 13 of
          Italian Legislative Decree 196/2003 and art. 13 of GDPR 679/2016.
        </p>
      </div>
    </section>
  );
};
