type CardHeaderProps = {
  rarity: string;
  accent: string;
  isActive: boolean;
};

export const CardHeader = ({ rarity, accent, isActive }: CardHeaderProps) => (
  <div className="absolute top-3 left-4 right-4 z-30 grid grid-cols-3 items-start pointer-events-none">
    <span className="archive-label justify-self-start">Archive</span>
    {isActive ? (
      <span
        className="justify-self-center font-display text-[8px] font-bold uppercase tracking-[0.24em] text-white/90"
        style={{ textShadow: `0 0 10px ${accent}` }}
      >
        Active
      </span>
    ) : (
      <span />
    )}
    <span className="rarity-badge justify-self-end" style={{ color: accent }}>
      {rarity}
    </span>
  </div>
);
