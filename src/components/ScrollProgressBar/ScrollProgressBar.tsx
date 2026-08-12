import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger, gsap } from "@/lib/gsap/gsap-plugins";

export const ScrollProgressBar = () => {
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => gsap.set(fill, { scaleX: self.progress }),
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="scroll-progress">
      <span className="scroll-progress__fill" ref={fillRef} />
    </div>
  );
};
