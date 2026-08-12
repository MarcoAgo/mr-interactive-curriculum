import type { TEducationItem } from "../EducationSection.types";

interface EducationHistoryBlockProps {
  item: TEducationItem;
}

export const EducationHistoryBlock = ({ item }: EducationHistoryBlockProps) => {
  return (
    <div className="education-block" data-para-block>
      <div className="education-block__meta">
        <span className="education-block__period" data-para>
          {item.period}
        </span>
        <h3 className="education-block__title" data-para>
          {item.title}
        </h3>
        <span className="education-block__place" data-para>
          {item.place}
        </span>
      </div>
      <p className="education-block__description" data-para>
        {item.description}
      </p>
    </div>
  );
};
