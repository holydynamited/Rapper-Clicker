type CardHeaderProps = {
  rarity: string;
  accent: string;
};

export const CardHeader = ({ rarity, accent }: CardHeaderProps) => (
  <div className="absolute top-3 left-4 right-4 z-30 flex justify-between items-start pointer-events-none">
    <span className="archive-label">Archive</span>
    <span className="rarity-badge" style={{ color: accent }}>
      {rarity}
    </span>
  </div>
);
