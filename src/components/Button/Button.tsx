import classNames from "classnames";
import "@/styles/main.scss";
import type { ButtonProps } from "./Button.types";

export const Button = ({
  variant = "primary",
  icon,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "button",
        `button--${variant}`,
        { "button--disabled": disabled },
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="button__icon">{icon}</span>}
      {children}
    </button>
  );
};
