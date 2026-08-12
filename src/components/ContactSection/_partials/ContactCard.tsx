import classNames from "classnames";
import type { CSSProperties, ElementType } from "react";
import type { TContactCard } from "../ContactSection.types";

interface ContactCardProps {
  card: TContactCard;
}

export const ContactCard = ({ card }: ContactCardProps) => {
  const Icon = card.icon;
  const style = { "--card-delay": card.delay } as CSSProperties & Record<"--card-delay", string>;
  const Tag = (card.href ? "a" : "div") as ElementType;
  const linkProps = card.href
    ? { href: card.href, ...(card.external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : {};

  return (
    <Tag
      className={classNames("contact-card", !card.href && "contact-card--static")}
      data-para
      style={style}
      {...linkProps}
    >
      <span className="contact-card__top">
        <span className="contact-card__icon">
          <Icon size={20} />
        </span>
        <span className="contact-card__eyebrow">{card.eyebrow}</span>
      </span>
      <span className="contact-card__bottom">
        <span className="contact-card__value">{card.value}</span>
        {card.note && <span className="contact-card__note">{card.note}</span>}
      </span>
    </Tag>
  );
};
