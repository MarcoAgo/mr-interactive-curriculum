import { useLayoutEffect, useRef } from "react";
import { FloatingShape } from "@/components/FloatingShape";
import { gsap } from "@/lib/gsap/gsap-plugins";
import { HERO_SHAPES } from "./_constants/hero-shapes.constants";

const HERO_NAME = "MARCO";
const HERO_SURNAME = "Agostinelli";

export const HeroSection = () => {
  const rootRef = useRef<HTMLElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const nameChars = root.querySelectorAll(".hero__char--name");
      const surnameChars = root.querySelectorAll(".hero__char--surname");
      const line = root.querySelector(".hero__subtitle-line");
      const subtitle = root.querySelector(".hero__subtitle");
      const scrollHint = root.querySelector(".hero__scroll-hint");

      gsap.set([nameChars, surnameChars], { opacity: 0, y: "0.5em", rotate: 4 });
      gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(subtitle, { opacity: 0, y: 10 });
      gsap.set(scrollHint, { opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(nameChars, { opacity: 1, y: 0, rotate: 0, duration: 0.75, stagger: 0.065 }, 0.1)
        .to(
          surnameChars,
          { opacity: 1, y: 0, rotate: 0, duration: 0.75, stagger: 0.055 },
          0.1 + nameChars.length * 0.065 + 0.15,
        )
        .to(line, { scaleX: 1, duration: 0.7 }, "-=0.5")
        .to(subtitle, { opacity: 1, y: 0, duration: 0.8 }, "-=0.45")
        .to(scrollHint, { opacity: 1, duration: 0.7 }, "-=0.3");
    }, root);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!root || !spot) return;

    const moveX = gsap.quickTo(spot, "x", { duration: 0.7, ease: "power3" });
    const moveY = gsap.quickTo(spot, "y", { duration: 0.7, ease: "power3" });

    const onPointerMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      moveX(event.clientX - rect.left);
      moveY(event.clientY - rect.top);
    };

    root.addEventListener("pointermove", onPointerMove);
    return () => root.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <header className="hero" data-hero ref={rootRef}>
      <div className="hero__grid" />
      <div className="hero__spot" ref={spotRef} />

      <div className="hero__shapes">
        {HERO_SHAPES.map(({ key, ...shape }) => (
          <FloatingShape key={key} {...shape} />
        ))}
      </div>

      <div className="hero__content">
        <h1 className="hero__name">
          <span className="hero__name-row hero__name-row--upper">
            {Array.from(HERO_NAME).map((ch, i) => (
              <span className="hero__char hero__char--name" key={`name-${i}`}>
                {ch}
              </span>
            ))}
          </span>
          <span className="hero__name-row hero__name-row--script">
            {Array.from(HERO_SURNAME).map((ch, i) => (
              <span className="hero__char hero__char--surname" key={`surname-${i}`}>
                {ch}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero__subtitle-row">
          <span className="hero__subtitle-line" />
          <span className="hero__subtitle">Frontend Web Developer</span>
        </div>
      </div>

      <div className="hero__scroll-hint">
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-track">
          <span className="hero__scroll-fill" />
        </span>
      </div>
    </header>
  );
};
