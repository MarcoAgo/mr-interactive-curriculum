import type { ReactNode } from "react";

export interface CardProps {
  title: string;
  compact?: boolean;
  children: ReactNode;
}
