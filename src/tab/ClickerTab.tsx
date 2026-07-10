import { useState, useCallback } from 'react';

import lean from '../assets/doublecup.png';
import type {click} from '../lib/clicks.ts'
import { playCupBubble } from '../lib/audio.ts'

type Props = {
  handleLeanMoney: () => void;
  clickTargetRef: React.RefObject<HTMLButtonElement | null>;
  handleMoneyAnimation: (e: React.MouseEvent) => void;
  clicks: click[];
}

type Ripple = { id: number; x: number; y: number };

const ClickerTab = ({ handleLeanMoney, clickTargetRef, handleMoneyAnimation, clicks }: Props) => {
  const [isSquishing, setIsSquishing] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple: Ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setIsSquishing(true);
    setShowGlow(true);
    setRipples(prev => [...prev, ripple]);

    playCupBubble();
    handleLeanMoney();
    handleMoneyAnimation(e);

    window.setTimeout(() => setIsSquishing(false), 420);
    window.setTimeout(() => setShowGlow(false), 500);
    window.setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 560);
  }, [handleLeanMoney, handleMoneyAnimation]);

  return (
    <div className="relative mx-auto mt-16 mb-10 flex w-full max-w-[480px] flex-col items-center overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-[#141414] p-4 shadow-[0_0_40px_rgba(255,255,255,0.06)] sm:mt-24 sm:p-6">
      <p className="mb-3 text-center font-display text-[10px] font-semibold uppercase tracking-[0.38em] text-zinc-500 sm:text-[11px]">
        Tap to pour
      </p>

      <div className="relative flex min-h-[300px] w-full items-center justify-center sm:min-h-[380px]">
        {showGlow && (
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/35 blur-2xl animate-lean-glow-burst sm:h-72 sm:w-72" />
        )}

        {ripples.map(r => (
          <span
            key={r.id}
            className="pointer-events-none absolute z-20 h-16 w-16 rounded-full border-2 border-purple-400/70 animate-click-ripple"
            style={{ left: r.x, top: r.y }}
          />
        ))}

        <button
          type="button"
          className="relative z-10 cursor-pointer border-0 bg-transparent p-0 outline-none select-none [-webkit-touch-callout:none]"
          onClick={handleClick}
          onContextMenu={e => e.preventDefault()}
          ref={clickTargetRef}
        >
          <img
            src={lean}
            alt="Lean cup"
            draggable={false}
            onDragStart={e => e.preventDefault()}
            className={`mx-auto h-auto w-[min(340px,88vw)] max-w-full select-none [-webkit-user-drag:none] touch-manipulation sm:w-[min(400px,92vw)] ${
              isSquishing ? 'animate-lean-squish' : 'transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]'
            }`}
          />
        </button>

        {clicks.map(c => (
          <div
            key={c.id}
            style={{ left: c.x, top: c.y }}
            className="pointer-events-none absolute z-30 text-lg font-extrabold text-purple-300 animate-money-pop drop-shadow-[0_0_12px_rgba(168,85,247,0.85)] sm:text-2xl"
          >
            +{c.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClickerTab;
