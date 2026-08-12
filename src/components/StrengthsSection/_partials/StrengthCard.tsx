import type { TStrengthItem } from "../StrengthsSection.types";

interface StrengthCardProps {
  item: TStrengthItem;
}

export const StrengthCard = ({ item }: StrengthCardProps) => {
  return (
    <div className="strength-card" data-para-block>
      <span className="strength-card__index" data-para>
        {item.index}
      </span>
      <h3 className="strength-card__title" data-para>
        {item.title}
      </h3>
      <p className="strength-card__description" data-para>
        {item.description}
      </p>
    </div>
  );
};
