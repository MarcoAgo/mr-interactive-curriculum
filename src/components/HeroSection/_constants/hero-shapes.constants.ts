import type { FloatingShapeProps } from "@/components/FloatingShape";

interface THeroShapeConfig extends FloatingShapeProps {
  key: string;
}

export const HERO_SHAPES: THeroShapeConfig[] = [
  {
    key: "ring",
    variant: "ring",
    motion: "orbit",
    duration: "16s",
    size: "xl",
    opacity: 0.75,
    parallax: "cursor",
    depth: 0.55,
    className: "hero__shape hero__shape--1",
  },
  {
    key: "square",
    variant: "square",
    motion: "bob",
    duration: "11s",
    size: "md",
    opacity: 0.62,
    parallax: "cursor",
    depth: 0.85,
    className: "hero__shape hero__shape--2",
  },
  {
    key: "triangle",
    variant: "triangle",
    motion: "spin-slow",
    duration: "34s",
    parallax: "cursor",
    depth: 0.35,
    className: "hero__shape hero__shape--3",
  },
  {
    key: "dot",
    variant: "dot",
    motion: "swell",
    duration: "8s",
    size: "xs",
    parallax: "cursor",
    depth: 1.15,
    className: "hero__shape hero__shape--4",
  },
  {
    key: "line",
    variant: "line",
    motion: "bob",
    duration: "14s",
    reverse: true,
    opacity: 0.7,
    parallax: "cursor",
    depth: 0.7,
    className: "hero__shape hero__shape--5",
  },
  {
    key: "squircle",
    variant: "squircle",
    motion: "orbit",
    duration: "21s",
    reverse: true,
    size: "lg",
    opacity: 0.6,
    parallax: "cursor",
    depth: 0.95,
    className: "hero__shape hero__shape--6",
  },
];
