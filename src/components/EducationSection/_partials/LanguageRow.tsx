import type { TLanguageItem } from "../EducationSection.types";

interface LanguageRowProps {
  language: TLanguageItem;
}

export const LanguageRow = ({ language }: LanguageRowProps) => {
  return (
    <div className="language-row" data-lang>
      <div className="language-row__top">
        <span className="language-row__name">{language.name}</span>
        <span className="language-row__level">{language.level}</span>
      </div>
      <span className="language-row__track">
        <span className="language-row__fill" data-langbar={language.percent} />
      </span>
    </div>
  );
};
