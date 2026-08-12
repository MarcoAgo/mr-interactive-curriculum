import { useUiStore } from "@/store/ui/use-ui";
import { selectorUiCloseModal } from "@/store/ui/ui.selectors";
import type { TExperienceItem } from "../ExperienceTimeline.types";

interface ExperienceTimelineModalContentProps {
  item: TExperienceItem;
}

export const ExperienceTimelineModalContent = ({ item }: ExperienceTimelineModalContentProps) => {
  const closeModal = useUiStore(selectorUiCloseModal);

  return (
    <div className="experience-modal__content">
      <span className="experience-modal__sweep">
        <span className="experience-modal__sweep-line" />
      </span>
      <button type="button" className="experience-modal__close" onClick={closeModal}>
        &#215;
      </button>
      <div className="experience-modal__meta">
        <span className="experience-modal__range">{item.range}</span>
        {item.intern && <span className="experience-modal__badge">Internship</span>}
      </div>
      <div className="experience-modal__header">
        <span className="experience-modal__year">{item.year}</span>
        <h3 className="experience-modal__role">{item.role}</h3>
        <span className="experience-modal__company">{item.company}</span>
        <span className="experience-modal__location">{item.location}</span>
      </div>
      <span className="experience-modal__divider" />
      <div className="experience-modal__body-copy">
        {item.modalBody.map((paragraph) => (
          <p className="experience-modal__paragraph" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="experience-modal__stack">
        {item.stack.map((tag) => (
          <span className="experience-modal__tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
