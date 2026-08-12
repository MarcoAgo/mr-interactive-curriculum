import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap/gsap-plugins";
import type { CSSProperties } from "react";
import type { TStrengthItem } from "../StrengthsSection.types";

interface StrengthCardProps {
  item: TStrengthItem;
  orderIndex: number;
}

const BORDER_COLOR_IDLE = "#131317";
const BORDER_COLOR_HOVER = "rgba(138, 124, 255, 0.26)";

export const StrengthCard = ({ item, orderIndex }: StrengthCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLSpanElement | null>(null);
  const numRef = useRef<HTMLSpanElement | null>(null);
  const ruleRef = useRef<HTMLSpanElement | null>(null);
  const dotRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    const num = numRef.current;
    const rule = ruleRef.current;
    const dot = dotRef.current;
    if (!card) return;

    const moveGlowX = glow ? gsap.quickTo(glow, "x", { duration: 0.4, ease: "power3" }) : null;
    const moveGlowY = glow ? gsap.quickTo(glow, "y", { duration: 0.4, ease: "power3" }) : null;
    const moveNumX = num ? gsap.quickTo(num, "x", { duration: 0.5, ease: "power3" }) : null;
    const moveNumY = num ? gsap.quickTo(num, "y", { duration: 0.5, ease: "power3" }) : null;

    const onPointerMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      moveGlowX?.(px);
      moveGlowY?.(py);
      moveNumX?.(((px - rect.width / 2) / rect.width) * -16);
      moveNumY?.(((py - rect.height / 2) / rect.height) * -10);
    };

    const onPointerEnter = () => {
      gsap.set(card, { borderColor: BORDER_COLOR_HOVER, y: -6 });
      if (glow) gsap.set(glow, { opacity: 1 });
      if (rule) gsap.set(rule, { scaleX: 1 });
      if (num) gsap.set(num, { webkitTextStrokeColor: "rgba(138, 124, 255, 0.34)" });
      if (dot) gsap.set(dot, { scale: 1.7, boxShadow: "0 0 16px 4px rgba(138, 124, 255, 0.75)" });
    };

    const onPointerLeave = () => {
      gsap.set(card, { borderColor: BORDER_COLOR_IDLE, y: 0 });
      if (glow) gsap.set(glow, { opacity: 0 });
      if (rule) gsap.set(rule, { scaleX: 0 });
      if (num) gsap.set(num, { webkitTextStrokeColor: "rgba(138, 124, 255, 0.14)", x: 0, y: 0 });
      if (dot) gsap.set(dot, { scale: 1, boxShadow: "0 0 10px 2px rgba(138, 124, 255, 0.5)" });
    };

    card.addEventListener("pointermove", onPointerMove);
    card.addEventListener("pointerenter", onPointerEnter);
    card.addEventListener("pointerleave", onPointerLeave);

    return () => {
      card.removeEventListener("pointermove", onPointerMove);
      card.removeEventListener("pointerenter", onPointerEnter);
      card.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const ringDelay = `${(orderIndex * 2.6).toFixed(1)}s`;
  const scanDelay = `${(orderIndex * 1.4).toFixed(1)}s`;
  const style = {
    "--ring-delay": ringDelay,
    "--scan-delay": scanDelay,
  } as CSSProperties & Record<"--ring-delay" | "--scan-delay", string>;

  return (
    <div className="strength-card" data-para-block ref={cardRef} style={style}>
      <span className="strength-card__ring">
        <span className="strength-card__ring-spin" />
      </span>
      <span className="strength-card__glow" ref={glowRef} />
      <span className="strength-card__num" ref={numRef}>
        {item.index}
      </span>
      <span className="strength-card__scan-wrap">
        <span className="strength-card__scan" />
      </span>
      <span className="strength-card__head">
        <span className="strength-card__dot" ref={dotRef} />
        <span className="strength-card__index" data-para>
          {item.index}
        </span>
        <span className="strength-card__label">{item.label}</span>
      </span>
      <span className="strength-card__foot">
        <h3 className="strength-card__title" data-para>
          {item.title}
        </h3>
        <p className="strength-card__description" data-para>
          {item.description}
        </p>
        <span className="strength-card__rule">
          <span className="strength-card__rule-fill" ref={ruleRef} />
        </span>
      </span>
    </div>
  );
};
