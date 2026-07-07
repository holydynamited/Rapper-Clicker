import type { rapper } from '../../lib/rappers';
import type { RarityConfig } from './config';
import { CardHeader } from './CardHeader';
import { EditorialPanel } from './EditorialPanel';
import { PhotoOverlays } from './PhotoOverlays';

type CardContentProps = {
  rapper: rapper;
  config: RarityConfig;
  cardNo: string;
  isArcane: boolean;
  chromeAngle: number;
  parallaxX: number;
  parallaxY: number;
};

/** Единый layout: фото на всю карту + инфо-панель снизу (на всех редкостях) */
export const CardContent = ({
  rapper,
  config,
  cardNo,
  isArcane,
  chromeAngle,
  parallaxX,
  parallaxY,
}: CardContentProps) => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-[27px]">
    <img
      src={rapper.rapperImg}
      alt={rapper.name}
      className="absolute inset-0 w-full h-full object-cover object-center scale-[1.04]"
      style={
        isArcane
          ? undefined
          : {
              transform: `translate(${parallaxX * -2}px, ${parallaxY * -2}px)`,
              transition: 'transform 0.2s ease-out',
            }
      }
    />

    {isArcane && (
      <>
        <div
          className="absolute inset-0 arcane-rgb-shift pointer-events-none z-[2] animate-arcane-rgb"
          style={{ ['--chrome-angle' as string]: `${chromeAngle}deg` }}
        />
        <div
          className="absolute inset-0 arcane-rgb-sheen pointer-events-none z-[3]"
          style={{ ['--chrome-angle' as string]: `${chromeAngle}deg` }}
        />
        <div className="absolute inset-0 shine-sweep animate-shine-sweep pointer-events-none z-[7]" />
        <div className="absolute inset-0 arcane-edge-glow pointer-events-none z-[8]" />
      </>
    )}

    <PhotoOverlays />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/15 pointer-events-none z-[4]" />

    {config.watermark && (
      <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
        <span className="arcane-watermark text-[96px] uppercase">{config.watermark}</span>
      </div>
    )}

    <CardHeader rarity={rapper.rapperRarity} accent={config.accent} />

    <EditorialPanel
      rapper={rapper}
      config={config}
      cardNo={cardNo}
      parallaxX={parallaxX}
      parallaxY={parallaxY}
      overlaid
      arcane={isArcane}
    />
  </div>
);
