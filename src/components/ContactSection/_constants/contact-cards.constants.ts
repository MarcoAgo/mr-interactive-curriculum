import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import type { TContactCard } from "../ContactSection.types";

export const CONTACT_CARDS: TContactCard[] = [
  {
    href: "tel:+393468036143",
    icon: FiPhone,
    eyebrow: "Phone",
    value: "(+39) 346 8036143",
    delay: "0.9s",
    row: 1,
  },
  {
    href: "https://www.linkedin.com/in/marco-agostinelli-44b53011a/",
    external: true,
    icon: FiLinkedin,
    eyebrow: "Profile ↗",
    value: "LinkedIn",
    delay: "1.35s",
    row: 1,
  },
  {
    href: "https://github.com/MarcoAgo",
    external: true,
    icon: FiGithub,
    eyebrow: "Code ↗",
    value: "GitHub",
    delay: "1.8s",
    row: 1,
  },
  {
    href: "mailto:marco.agostinelli1996@gmail.com",
    icon: FiMail,
    eyebrow: "Email",
    value: "marco.agostinelli1996@gmail.com",
    delay: "0.45s",
    row: 2,
  },
  {
    icon: FiMapPin,
    eyebrow: "Based in",
    value: "Verona, Italy",
    note: "Available remote",
    delay: "2.25s",
    row: 2,
  },
];
