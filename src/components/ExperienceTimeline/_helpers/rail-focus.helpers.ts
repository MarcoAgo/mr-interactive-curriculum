export const smoothstep = (v: number): number => v * v * (3 - 2 * v);

export const clamp01 = (v: number): number => Math.min(Math.max(v, 0), 1);

export const computeCardFocus = (cardCenterX: number, viewportWidth: number): number =>
  smoothstep(clamp01(1 - Math.abs(cardCenterX - viewportWidth / 2) / (viewportWidth * 0.72)));

export const computeChildFocus = (t: number, childIndex: number): number => {
  const s0 = childIndex * 0.12;
  const s1 = Math.min(s0 + 0.55, 0.98);
  return smoothstep(clamp01((t - s0) / (s1 - s0)));
};
