type HapticStyle = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';

interface TelegramWebAppUser {
  id: number;
  first_name: string;
  username?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  initDataUnsafe: {
    user?: TelegramWebAppUser;
  };
  HapticFeedback?: {
    impactOccurred: (style: HapticStyle) => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

function getTg() {
  return window.Telegram?.WebApp;
}

export function initTelegram() {
  const tg = getTg();
  if (!tg) return;

  tg.ready();
  tg.expand();
  tg.setHeaderColor('#191919');
  tg.setBackgroundColor('#0b0c10');
}

export function isTelegramApp() {
  return Boolean(getTg());
}

export function getTelegramWelcome(): string | null {
  const user = getTg()?.initDataUnsafe?.user;
  if (!user) return null;
  return user.username ? `@${user.username}` : user.first_name;
}

export function hapticImpact(style: HapticStyle = 'light') {
  getTg()?.HapticFeedback?.impactOccurred(style);
}
