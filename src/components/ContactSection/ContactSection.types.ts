import type { IconType } from "react-icons";

export interface TContactCard {
  href?: string;
  external?: boolean;
  icon: IconType;
  eyebrow: string;
  value: string;
  note?: string;
  delay: string;
  row: 1 | 2;
}
