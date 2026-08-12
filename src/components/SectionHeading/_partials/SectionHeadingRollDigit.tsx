import { getRollSequence } from "../_helpers/roll-sequence.helpers";

interface SectionHeadingRollDigitProps {
  target: number;
}

export const SectionHeadingRollDigit = ({ target }: SectionHeadingRollDigitProps) => {
  const sequence = getRollSequence(target);

  return (
    <span className="section-heading__roll">
      <span className="section-heading__roll-track" data-roll-track>
        {sequence.map((digit, i) => (
          <span key={`${digit}-${i}`}>{digit}</span>
        ))}
      </span>
    </span>
  );
};
