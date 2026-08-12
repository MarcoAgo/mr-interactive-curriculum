import type { TEducationItem, TLanguageItem } from "../EducationSection.types";

export const EDUCATION_ITEMS: TEducationItem[] = [
  {
    period: "2015 — 2018",
    title: "Web & Multimedia Designer",
    place: "Istituto Design Palladio · Verona, Italy",
    description:
      "Foundations of programming (HTML, CSS, JavaScript, jQuery, PHP, MySQL), UI/UX design, WordPress, client management and SEO. EQF level 4.",
  },
  {
    period: "2010 — 2015",
    title: "High school diploma",
    place: "Istituto Seghetti · Verona, Italy",
    description: "National classification EQF level 4.",
  },
];

export const LANGUAGE_ITEMS: TLanguageItem[] = [
  { name: "Italian", level: "Native", percent: 100 },
  { name: "English", level: "B2 · Intermediate", percent: 66 },
  { name: "German", level: "A2 · Elementary", percent: 30 },
];
