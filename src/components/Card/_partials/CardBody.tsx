import type { ReactNode } from "react";

interface CardBodyProps {
  children: ReactNode;
}

export const CardBody = ({ children }: CardBodyProps) => (
  <div className="card__body">{children}</div>
);
