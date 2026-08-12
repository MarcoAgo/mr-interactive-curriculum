import type { CSSProperties } from "react";
import type { TExperienceItem } from "../ExperienceTimeline.types";

interface ExperienceTimelineCardProps {
  item: TExperienceItem;
  delay: string;
}

export const ExperienceTimelineCard = ({ item, delay }: ExperienceTimelineCardProps) => {
  const style = { "--card-delay": delay } as CSSProperties & Record<"--card-delay", string>;

  return (
    <article className="timeline-card" style={style}>
      <div className="timeline-card__top">
        <span className="timeline-card__period">{item.period}</span>
        <span className="timeline-card__index">{item.index}</span>
      </div>
      <h3 className="timeline-card__role">{item.role}</h3>
      <div className="timeline-card__org">
        <span className="timeline-card__company">{item.company}</span>
        <span className="timeline-card__location">{item.location}</span>
      </div>
      <p className="timeline-card__description">{item.description}</p>
    </article>
  );
};
