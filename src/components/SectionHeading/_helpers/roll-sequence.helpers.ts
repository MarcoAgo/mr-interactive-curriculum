export const getRollSequence = (target: number): number[] =>
  [target - 3, target - 2, target - 1, target].map((n) => ((n % 10) + 10) % 10);
