import { RAPPERS, type rapper, type rarity } from './rappers.ts';

const RARITY_WEIGHTS: Record<rarity, number> = {
  common: 60,
  rare: 30,
  epic: 8,
  arcane: 2,
};

export function rollCrate(): rapper {
  const roll = Math.random() * 100;
  let cumulative = 0;

  let selectedRarity: rarity = 'common';
  for (const [tier, weight] of Object.entries(RARITY_WEIGHTS) as [rarity, number][]) {
    cumulative += weight;
    if (roll <= cumulative) {
      selectedRarity = tier;
      break;
    }
  }

  const pool = RAPPERS.filter(r => r.rapperRarity === selectedRarity);
  return pool[Math.floor(Math.random() * pool.length)];
}
