import classNames from "classnames";
import type { CSSProperties } from "react";
import type { FloatingShapeProps } from "./FloatingShape.types";
import { SHAPE_SIZES } from "./_constants/shape-sizes.constants";

type TShapeStyle = CSSProperties & Record<`--${string}`, string | number>;

export const FloatingShape = ({
  variant,
  motion,
  duration,
  size = "md",
  reverse = false,
  delay,
  opacity,
  className,
  parallax,
  depth,
}: FloatingShapeProps) => {
  const sizeToken = SHAPE_SIZES[size];

  const style: TShapeStyle = {
    "--shape-min": sizeToken.min,
    "--shape-preferred": sizeToken.preferred,
    "--shape-max": sizeToken.max,
    "--motion-duration": duration,
    "--motion-direction": reverse ? "reverse" : "normal",
    ...(opacity !== undefined ? { "--shape-opacity": opacity } : {}),
    ...(delay ? { animationDelay: delay } : {}),
  };

  return (
    <div
      className={classNames("floating-shape", className)}
      data-shape={parallax === "cursor" ? true : undefined}
      data-depth={parallax === "cursor" ? (depth ?? 0.5) : undefined}
      data-drift={parallax === "scroll" ? true : undefined}
      style={style}
    >
      <div className={classNames("floating-shape__motion", `floating-shape__motion--${motion}`)}>
        <div className={classNames("floating-shape__body", `floating-shape__body--${variant}`)} />
      </div>
    </div>
  );
};
