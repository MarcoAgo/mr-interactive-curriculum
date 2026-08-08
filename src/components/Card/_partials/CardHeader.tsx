interface CardHeaderProps {
  title: string;
}

export const CardHeader = ({ title }: CardHeaderProps) => (
  <div className="card__header">
    <span className="card__title">{title}</span>
  </div>
);
