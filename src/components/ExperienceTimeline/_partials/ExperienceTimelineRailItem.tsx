import classNames from "classnames";
import { useUiStore } from "@/store/ui/use-ui";
import { selectorUiOpenModal } from "@/store/ui/ui.selectors";
import { ExperienceTimelineModalContent } from "./ExperienceTimelineModalContent";
import type { TExperienceItem } from "../ExperienceTimeline.types";

interface ExperienceTimelineRailItemProps {
  item: TExperienceItem;
}

export const ExperienceTimelineRailItem = ({ item }: ExperienceTimelineRailItemProps) => {
  const openModal = useUiStore(selectorUiOpenModal);

  const handleReadMore = () => {
    openModal({
      id: item.index,
      content: <ExperienceTimelineModalContent item={item} />,
      size: "lg",
      contentClassName: "experience-modal__panel",
      backdropClassName: "experience-modal__backdrop",
      bodyClassName: "experience-modal__body",
      hideCloseButton: true,
      motionPreset: "none",
    });
  };

  return (
    <article className={classNames("rail-item", item.intern && "rail-item--alt")} data-rail-item>
      <div className="rail-item__top">
        <span className="rail-item__index">{item.index}</span>
        <span className="rail-item__year">{item.year}</span>
        <span className="rail-item__range">{item.range}</span>
        {item.intern && <span className="rail-item__badge">Internship</span>}
      </div>
      <div className="rail-item__node-row">
        <span className="rail-item__node" data-node />
      </div>
      <div className="rail-item__bottom">
        <h3 className="rail-item__role" data-role>
          {item.role}
        </h3>
        <span className="rail-item__company">{item.company}</span>
        <span className="rail-item__location">{item.location}</span>
        <p className="rail-item__description">{item.description}</p>
        <button type="button" className="rail-item__more" onClick={handleReadMore}>
          Read more <span className="rail-item__more-arrow">&#8594;</span>
        </button>
      </div>
    </article>
  );
};
