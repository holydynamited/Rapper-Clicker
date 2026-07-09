import type { rapper } from '../../lib/rappers';
import { CardContent } from './CardContent';
import { CardTextures } from './CardTextures';
import {
  CARD_H,
  CARD_W,
  FRAME_PAD,
  formatArchiveNo,
  getRarityConfig,
} from './config';
import { useCardTilt } from './useCardTilt';



export type RapperCardProps = {
  rapper: rapper;
  /** Archive number — No. 001, No. 002, … */
  archiveNo?: number;
  className?: string;
  isUnlocked: boolean;
  isActive: boolean;
};

export const RapperCard = ({
  rapper,
  archiveNo = 1,
  className = '',
  isUnlocked,
  isActive,
}: RapperCardProps) => {
  const config = getRarityConfig(rapper.rapperRarity);
  const isArcane = rapper.rapperRarity === 'arcane';
  const cardNo = formatArchiveNo(archiveNo);

  const {
    cardRef,
    rotateX,
    rotateY,
    parallaxX,
    parallaxY,
    chromeAngle,
    hovered,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  } = useCardTilt();

  const outerW = CARD_W + FRAME_PAD * 2;
  const outerH = CARD_H + FRAME_PAD * 2;

  return (
    <div
      className={`relative flex-none shrink-0 ${isUnlocked && isArcane ? 'arcane-drop-glow' : ''} ${className}`}
      style={{ perspective: '1400px', width: outerW, height: outerH }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`relative z-10 flex-none overflow-hidden rounded-[30px] ${isUnlocked ? config.glowClass : ''} ${isUnlocked && !hovered ? 'animate-card-float' : ''} ${isUnlocked && isArcane ? 'animate-arcane-flicker' : ''}`}
        style={{
          width: outerW,
          height: outerH,
          transform: hovered
            ? `scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
            : undefined,
          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease',
        }}
      >
        <div
          className={`${isUnlocked ? config.frameClass : 'p-[3px] bg-zinc-800'} rounded-[30px] flex-none overflow-hidden ${hovered ? 'card-volume-hover' : 'card-volume'}`}
          style={{
            width: outerW,
            height: outerH,
            transform: isArcane ? undefined : `translate(${parallaxX * 0.25}px, ${parallaxY * 0.2}px)`,
            transition: isArcane ? undefined : 'transform 0.2s ease-out',
            ...(isArcane ? { ['--chrome-angle' as string]: `${chromeAngle}deg` } : {}),
          }}
        >
          <div
            className={`relative rounded-[27px] overflow-hidden flex-none ${isUnlocked && isArcane ? 'arcane-unified' : 'bg-card-base card-inner-shadow'}`}
            style={{
              width: CARD_W,
              height: CARD_H,
              transform: isArcane ? undefined : `translate(${parallaxX * 0.12}px, ${parallaxY * 0.1}px)`,
              transition: isArcane ? undefined : 'transform 0.2s ease-out',
            }}
          >
            <CardTextures config={config} showBase={!isArcane} isUnlocked={isUnlocked} />

            <CardContent
              rapper={rapper}
              isUnlocked={isUnlocked}
              isActive={isActive}
              config={config}
              cardNo={cardNo}
              isArcane={isArcane}
              chromeAngle={chromeAngle}
              parallaxX={parallaxX}
              parallaxY={parallaxY}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RapperCard;
