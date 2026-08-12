import classNames from "classnames";
import type { TSkillGroup } from "../SkillsSection.types";

interface SkillGroupProps {
  group: TSkillGroup;
}

export const SkillGroup = ({ group }: SkillGroupProps) => {
  return (
    <div className="skill-group" data-skillgroup>
      <span className="skill-group__dot" data-skilldot />
      <h3 className="skill-group__title" data-skillgroup-title>
        {group.title}
      </h3>
      <div className="skill-group__items">
        {group.items.map((item) => (
          <span
            key={item.label}
            className={classNames("skill-group__item", item.basic && "skill-group__item--basic")}
            data-skillgroup-item
          >
            {item.label}
            {item.basic && <span className="skill-group__item-tag">BASIC</span>}
          </span>
        ))}
      </div>
    </div>
  );
};
