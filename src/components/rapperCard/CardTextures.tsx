import type { RarityConfig } from './config';

type CardTexturesProps = {
  config: RarityConfig;
  showBase: boolean;
};

export const CardTextures = ({ config, showBase }: CardTexturesProps) => (
  <>
    {showBase && (
      <>
        <div className="absolute inset-0 bg-marble pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-black-silk pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-subtle-noise pointer-events-none z-[1]" />
      </>
    )}
    {config.epicShift && (
      <div className="absolute inset-0 epic-gradient-shift pointer-events-none opacity-35 z-[1]" />
    )}
    {config.amethystEdge && (
      <div className="absolute inset-0 epic-amethyst-edge pointer-events-none z-[1]" />
    )}
    {config.bronzeGleam && (
      <div className="absolute inset-0 bronze-gleam animate-bronze-gleam pointer-events-none z-[2]" />
    )}
  </>
);
