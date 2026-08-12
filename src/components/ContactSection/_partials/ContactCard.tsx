import type { CSSProperties } from "react";
import type { TContactCard } from "../ContactSection.types";

interface ContactCardProps {
  card: TContactCard;
}

export const ContactCard = ({ card }: ContactCardProps) => {
  const Icon = card.icon;
  const style = { "--card-delay": card.delay } as CSSProperties & Record<"--card-delay", string>;

  return (
    <a className="contact-card" href={card.href} data-para style={style}>
      <span className="contact-card__top">
        <span className="contact-card__icon">
          <Icon size={20} />
        </span>
        <span className="contact-card__eyebrow">{card.eyebrow}</span>
      </span>
      <span className="contact-card__value">{card.value}</span>
    </a>
  );
};
