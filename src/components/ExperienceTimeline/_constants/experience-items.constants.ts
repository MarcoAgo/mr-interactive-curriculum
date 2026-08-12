import type { TExperienceItem } from "../ExperienceTimeline.types";

export const EXPERIENCE_ITEMS: TExperienceItem[] = [
  {
    index: "01",
    year: "2024",
    range: "NOV 2024 — PRESENT",
    role: "Senior Frontend Developer",
    company: "Reverse Group",
    location: "Fully remote",
    description:
      "Legacy frontends upgraded to the latest React and Node.js. Custom Redux/Flux store replaced with Zustand, SSR architecture proposed, AI workflows brought into the team.",
    modalBody: [
      "Leading the architectural upgrade of several legacy frontends to the latest versions of React and Node.js, taking each codebase from an ageing setup to a modern, maintainable one without stopping delivery.",
      "Replaced a custom Redux/Flux store with Zustand, simplifying state management across the platform, and proposed the SSR architecture — Vite and React Router 7 with server-to-server API calls — that the team now builds on.",
      "Also the internal driver for AI adoption: building Claude-based skills, projects and workflows that shorten everyday development tasks for the whole team.",
    ],
    stack: ["React", "Node.js", "Zustand", "Vite", "React Router 7", "SSR", "Claude"],
  },
  {
    index: "02",
    year: "2022",
    range: "JUN 2022 — NOV 2024",
    role: "Frontend Developer",
    company: "AQuest Srl",
    location: "Verona, Italy",
    description:
      "Internal projects across several React approaches and the in-house framework, Malmo. End-to-end website builds with the backend team.",
    modalBody: [
      "Maintained and evolved internal projects built on several different React-based approaches, including the in-house framework, Malmo, moving between very different codebases and conventions.",
      "Handled end-to-end website development — from layout implementation to integration — working in direct collaboration with the backend team on data flow, contracts and corner cases.",
    ],
    stack: ["React", "Next.js", "Malmo", "TypeScript", "SCSS"],
  },
  {
    index: "03",
    year: "2021",
    range: "SEP 2021 — JUN 2022",
    role: "Frontend Developer",
    company: "Reverse",
    location: "Bologna, Italy",
    description:
      "A project built from scratch in Next.js and TypeScript, refactors, weekly Agile sprints, and co-ownership of the company design system.",
    modalBody: [
      "Built a product from scratch with Next.js and TypeScript, defining structure and conventions from the first commit, and refactored existing codebases to bring them up to the same standard.",
      "Worked Agile on weekly sprints alongside external developers, and co-owned a custom company design system — components, tokens and documentation shared across projects.",
    ],
    stack: ["Next.js", "TypeScript", "Design system", "Agile"],
  },
  {
    index: "04",
    year: "2019",
    range: "JUN 2019 — SEP 2021",
    role: "Frontend Developer",
    company: "Milkman Spa",
    location: "Verona, Italy",
    description:
      "React, Redux, Storybook, Jest and Cypress. Complex components, in-platform data, code review in a team of 5+, Jira and GitHub CI.",
    modalBody: [
      "Developed complex components for a logistics platform with React and Redux, documenting them in Storybook and covering them with Jest, Testing Library and Cypress.",
      "Owned server requests and in-platform data management, and took part in code review inside a team of 5+ developers, with Jira for planning, GitHub CI for delivery and basic AWS work on the infrastructure side.",
    ],
    stack: ["React", "Redux", "Storybook", "Jest", "Testing Library", "Cypress", "AWS"],
  },
  {
    index: "05",
    year: "2018",
    range: "JAN 2018 — MAY 2019",
    role: "Frontend Developer",
    company: "Studio Zerotredici Srl",
    location: "Verona, Italy",
    description:
      "Custom graphic layouts built in native HTML, CSS and JavaScript, plus WordPress sites with admin sections in CodeIgniter and MySQL.",
    modalBody: [
      "Translated custom graphic layouts into native HTML, CSS and JavaScript builds, with close attention to fidelity to the original design.",
      "Delivered WordPress sites based on premium themes, plus admin-managed sections written in CodeIgniter with MySQL behind them.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "WordPress", "CodeIgniter", "MySQL"],
  },
  {
    index: "06",
    year: "2017",
    range: "JUL 2017 — OCT 2017",
    role: "Web Developer",
    company: "Hello Creative Studio",
    location: "Verona, Italy",
    intern: true,
    description: "Basic backend work in Laravel, alongside WordPress site and theme development.",
    modalBody: [
      "Internship split between basic backend development in Laravel and the client side of the studio's work.",
      "Developed and customised WordPress sites and themes, a first exposure to shipping real client projects on a deadline.",
    ],
    stack: ["Laravel", "WordPress", "PHP"],
  },
  {
    index: "07",
    year: "2016",
    range: "JUL 2016 — SEP 2016",
    role: "Web & Graphic Designer",
    company: "Sinapsi Srl",
    location: "Arcole (VR), Italy",
    intern: true,
    description: "WordPress development and web layout design — the first step, right after design school.",
    modalBody: [
      "The first professional step, right after design school: WordPress development paired with web layout design.",
      "A summer spent moving between designing a page and building it — the moment the choice of going toward frontend development took shape.",
    ],
    stack: ["WordPress", "Web design", "Photoshop"],
  },
];
