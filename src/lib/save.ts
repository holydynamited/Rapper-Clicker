const SAVE_KEY = 'rapper-clicker-save';

export type SaveData = {
  leanMoney: number;
  rappers: string[];
  activeRapperId: string;
  leanPerSecond: number;
};

export function loadSave(): SaveData | null {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SaveData;
  } catch {
    return null;
  }
}

export function writeSave(data: SaveData): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}
