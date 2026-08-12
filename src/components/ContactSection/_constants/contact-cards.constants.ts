import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import type { TContactCard } from "../ContactSection.types";

export const CONTACT_CARDS: TContactCard[] = [
  {
    href: "mailto:marco.agostinelli1996@gmail.com",
    icon: FiMail,
    eyebrow: "Email",
    value: "marco.agostinelli1996@gmail.com",
    delay: "0.45s",
  },
  {
    href: "tel:+393468036143",
    icon: FiPhone,
    eyebrow: "Phone",
    value: "(+39) 346 8036143",
    delay: "0.9s",
  },
  {
    href: "#",
    icon: FiLinkedin,
    eyebrow: "Profile ↗",
    value: "LinkedIn",
    delay: "1.35s",
  },
  {
    href: "#",
    icon: FiGithub,
    eyebrow: "Code ↗",
    value: "GitHub",
    delay: "1.8s",
  },
];
