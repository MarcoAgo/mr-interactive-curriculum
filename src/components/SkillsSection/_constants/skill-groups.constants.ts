import type { TSkillGroup } from "../SkillsSection.types";

export const SKILL_GROUPS: TSkillGroup[] = [
  {
    title: "Languages",
    items: [
      { label: "JavaScript" },
      { label: "TypeScript" },
      { label: "HTML" },
      { label: "CSS" },
      { label: "PHP", basic: true },
      { label: "MySQL", basic: true },
    ],
  },
  {
    title: "Frameworks & libraries",
    items: [
      { label: "React" },
      { label: "Next.js" },
      { label: "Vite" },
      { label: "React Router 7" },
      { label: "Zustand" },
      { label: "Redux / RTK" },
      { label: "Jotai" },
      { label: "Vue" },
      { label: "Node.js" },
      { label: "Svelte", basic: true },
    ],
  },
  {
    title: "Testing",
    items: [{ label: "Jest" }, { label: "Testing Library" }, { label: "Cypress" }, { label: "Storybook" }],
  },
  {
    title: "Versioning & CI",
    items: [
      { label: "Git" },
      { label: "GitHub" },
      { label: "GitLab" },
      { label: "GitKraken" },
      { label: "SourceTree" },
      { label: "CI/CD" },
    ],
  },
  {
    title: "Cloud & CMS",
    items: [
      { label: "WordPress" },
      { label: "PrestaShop" },
      { label: "AWS", basic: true },
      { label: "Joomla", basic: true },
    ],
  },
  {
    title: "Tools & OS",
    items: [{ label: "VS Code" }, { label: "WebStorm" }, { label: "macOS" }, { label: "Windows" }, { label: "Ubuntu" }],
  },
];
