export type TFloatingShapeVariant = "ring" | "squircle" | "square" | "triangle" | "dot" | "line";
export type TFloatingShapeMotion = "orbit" | "bob" | "spin-slow" | "swell";
export type TFloatingShapeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TFloatingShapeParallax = "cursor" | "scroll";

export interface FloatingShapeProps {
  variant: TFloatingShapeVariant;
  motion: TFloatingShapeMotion;
  duration: string;
  size?: TFloatingShapeSize;
  reverse?: boolean;
  delay?: string;
  opacity?: number;
  className?: string;
  parallax?: TFloatingShapeParallax;
  depth?: number;
}
