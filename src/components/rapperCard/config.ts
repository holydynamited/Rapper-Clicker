import type { rapper } from '../../lib/rappers';

export type Rarity = rapper['rapperRarity'];

export type RarityConfig = {
  frameClass: string;
  glowClass: string;
  accent: string;
  volume: string;
  bronzeGleam: boolean;
  epicShift: boolean;
  amethystEdge: boolean;
  watermark: string;
};

const VOLUME: Record<Rarity, string> = {
  common: 'I',
  rare: 'II',
  epic: 'III',
  arcane: 'IV',
};

export const CARD_W = 250;
export const CARD_H = 360;
export const PANEL_H = 120;
export const FRAME_PAD = 3;

export const RARITY_CONFIG: Record<Rarity, RarityConfig> = {
  common: {
    frameClass: 'frame-graphite',
    glowClass: '',
    accent: '#808080',
    volume: VOLUME.common,
    bronzeGleam: false,
    epicShift: false,
    amethystEdge: false,
    watermark: '',
  },
  rare: {
    frameClass: 'frame-bronze',
    glowClass: 'glow-rare',
    accent: '#a38a68',
    volume: VOLUME.rare,
    bronzeGleam: true,
    epicShift: false,
    amethystEdge: false,
    watermark: '',
  },
  epic: {
    frameClass: 'frame-obsidian',
    glowClass: 'glow-epic',
    accent: '#8c6aa8',
    volume: VOLUME.epic,
    bronzeGleam: false,
    epicShift: true,
    amethystEdge: true,
    watermark: '',
  },
  arcane: {
    frameClass: 'frame-chrome',
    glowClass: '',
    accent: '#ece8f0',
    volume: VOLUME.arcane,
    bronzeGleam: false,
    epicShift: false,
    amethystEdge: false,
    watermark: 'Vamp',
  },
};

export function getRarityConfig(rarity: Rarity): RarityConfig {
  return RARITY_CONFIG[rarity];
}

export function formatArchiveNo(no: number): string {
  return String(no).padStart(3, '0');
}
