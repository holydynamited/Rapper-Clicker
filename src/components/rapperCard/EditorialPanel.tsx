import type { rapper } from '../../lib/rappers';
import type { RarityConfig } from './config';
import { PANEL_H } from './config';

type EditorialPanelProps = {
  rapper: rapper;
  config: RarityConfig;
  cardNo: string;
  parallaxX: number;
  parallaxY: number;
  overlaid: boolean;
  arcane?: boolean;
};

export const EditorialPanel = ({
  rapper,
  config,
  cardNo,
  parallaxX,
  parallaxY,
  overlaid,
  arcane = false,
}: EditorialPanelProps) => (
  <div
    className={`${arcane ? 'glass-panel-arcane rounded-b-[27px]' : 'glass-panel rounded-b-[27px]'} shrink-0 ${overlaid ? 'absolute bottom-0 left-0 right-0 z-20' : 'relative z-10'}`}
    style={{
      height: PANEL_H,
      transform: arcane ? undefined : `translate(${parallaxX * 0.5}px, ${parallaxY * 0.3}px)`,
      transition: arcane ? undefined : 'transform 0.2s ease-out',
    }}
  >
    <div className="h-full px-4 py-2.5 flex flex-col gap-1.5 min-w-0">
      <div className="min-w-0 shrink-0">
        <h2
          className="font-display text-[15px] font-extrabold uppercase tracking-[0.14em] text-white leading-tight truncate"
          style={{ textShadow: '0 0 18px rgba(255,255,255,0.12)' }}
        >
          {rapper.name}
        </h2>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="archive-label">Vol. {config.volume}</span>
          <span className="archive-label opacity-50">·</span>
          <span className="archive-label">No. {cardNo}</span>
        </div>
      </div>

      <div className="editorial-rule shrink-0" />

      <p
        className="font-elegant text-[17px] leading-none truncate shrink-0"
        style={{ color: config.accent }}
      >
        {rapper.about}
      </p>

      <div className="editorial-rule shrink-0" />

      <div className="flex gap-1.5 min-w-0 shrink-0 mt-auto">
        <div className="stat-chip shrink-0">
          <span>⚡</span>
          <span>{rapper.clickPower}</span>
        </div>
        <div className="stat-chip shrink-0">
          <span>🥤</span>
          <span>{rapper.leanPerSecond}/sec</span>
        </div>
      </div>
    </div>
  </div>
);
