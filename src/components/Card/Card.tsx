import classNames from "classnames";
import "@/styles/main.scss";
import type { CardProps } from "./Card.types";
import { CardBody } from "./_partials/CardBody";
import { CardHeader } from "./_partials/CardHeader";

export const Card = ({ title, compact = false, children }: CardProps) => {
  return (
    <div className={classNames("card", { "card--compact": compact })}>
      <CardHeader title={title} />
      <CardBody>{children}</CardBody>
    </div>
  );
};
