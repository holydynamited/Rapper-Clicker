import { useState, useCallback } from 'react';

import RapperCard from '../components/RapperCard';
import { getRarityConfig } from '../components/rapperCard/config';
import { type rapper, RAPPERS } from '../lib/rappers.ts';
import { rollCrate } from '../lib/crateDrop.ts';

import casePhoto from '../assets/crates/basic-crate.png.png';
import { playRapperPreview, stopRapperPreview, playCaseBubble } from '../lib/audio.ts';
import { hapticImpact } from '../lib/telegram.ts';

const CRATE_PRICE = 500;

type CaseState = 'idle' | 'shaking' | 'opened';

type Props = {
  handleCaseRapper: (r: rapper) => void;
  rappers: string[];
  leanMoney:number;
 
};

const CasesTab = ({ handleCaseRapper, rappers, leanMoney }: Props) => {
  const [caseState, setCaseState] = useState<CaseState>('idle');
  const [wonItem, setWonItem] = useState<rapper | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const resetCase = () => {
    stopRapperPreview();
    setShowModal(false);
    setTimeout(() => {
      setCaseState('idle');
      setWonItem(null);
      setIsDuplicate(false);
    }, 300);
  };

  const canAfford = leanMoney >= CRATE_PRICE;

  const handleOpenCase = useCallback(() => {
    if (caseState !== 'idle' || !canAfford) return;

    const winningItem = rollCrate();
    const duplicate = rappers.includes(winningItem.id);

    setCaseState('shaking');
    setWonItem(null);
    setIsDuplicate(duplicate);
    setShowModal(false);

    playCaseBubble();
    hapticImpact('medium');
    handleCaseRapper(winningItem);

    setTimeout(() => {
      setCaseState('opened');
      setWonItem(winningItem);

      setTimeout(() => {
        setShowModal(true);
        playRapperPreview(winningItem.id);
        hapticImpact(winningItem.rapperRarity === 'arcane' ? 'heavy' : 'medium');
      }, 200);
    }, 2500);
  }, [caseState, canAfford, handleCaseRapper, rappers]);

  const wonConfig = wonItem ? getRarityConfig(wonItem.rapperRarity) : null;

  return (
    <>
      <div className="relative mx-auto mb-16 mt-16 w-full max-w-[800px] overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-[#141414] p-3 shadow-[0_0_40px_rgba(255,255,255,0.06)] sm:mt-24 sm:p-6">

        <div className="flex min-h-[360px] flex-col items-center justify-center p-3 sm:min-h-[480px] sm:p-6">
          <div className="relative mb-6 flex h-56 w-48 items-center justify-center sm:mb-8 sm:h-80 sm:w-64">
            <div
              className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 pointer-events-none ${
                caseState === 'shaking' ? 'opacity-100 scale-150 bg-purple-500/20' : 'opacity-0 scale-100'
              }`}
            />

            <div
              className={`relative z-10 transition-all duration-300 select-none [-webkit-touch-callout:none] ${
                caseState === 'shaking' ? 'animate-violent-shake drop-shadow-[0_0_40px_rgba(168,85,247,0.35)]' : ''
              } ${caseState === 'opened' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
              onContextMenu={e => e.preventDefault()}
            >
              <img
                className="pointer-events-none h-auto w-[min(220px,60vw)] select-none object-contain [-webkit-user-drag:none] sm:h-95 sm:w-75"
                src={casePhoto}
                alt="Crate"
                draggable={false}
                onDragStart={e => e.preventDefault()}
              />
            </div>

            <div
              className={`absolute inset-0 bg-white rounded-full blur-2xl transition-all duration-300 pointer-events-none ${
                caseState === 'opened' && !showModal ? 'opacity-80 scale-150' : 'opacity-0 scale-0'
              }`}
            />
          </div>

          <button
            type="button"
            onClick={handleOpenCase}
            disabled={caseState !== 'idle' || !canAfford}
            className={`
              relative mt-2 w-full max-w-xs px-6 py-3 rounded-xl text-sm uppercase tracking-widest sm:max-w-none sm:px-10 sm:text-lg
              transition-all duration-300 overflow-hidden
              ${caseState !== 'idle' || !canAfford
                ? 'bg-zinc-900/60 border border-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-white/5 border border-white/10 backdrop-blur-sm text-white/90 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:bg-white/10 hover:border-white/20'
              }
            `}
          >
            {caseState === 'shaking'
              ? 'Unlocking...'
              : !canAfford
                ? 'Not enough money'
                : 'Buy Crate'}
            {caseState === 'idle' && canAfford && (
              <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[30deg] animate-shine" />
            )}
          </button>

          <span className="mt-2 text-zinc-500 text-sm tracking-widest">{CRATE_PRICE} $</span>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-end justify-center p-2 transition-all duration-500 sm:items-center sm:p-4 ${
          showModal ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={resetCase} />

        {wonItem && wonConfig && (
          <div
            className={`relative mb-safe max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900/95 p-4 sm:mb-0 sm:p-6
              transform transition-all duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
              ${showModal ? 'scale-100 translate-y-0 opacity-100' : 'scale-50 translate-y-24 opacity-0'}`}
            style={{ borderTopColor: wonConfig.accent, borderTopWidth: 4 }}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors p-2 text-xl cursor-pointer"
              onClick={resetCase}
            >
              ✕
            </button>

            <h2 className="text-center text-zinc-500 text-xs tracking-[0.28em] uppercase mb-1">
              {isDuplicate ? 'Duplicate — Refund' : 'New Drop'}
            </h2>
            <p
              className="text-center font-display text-sm font-bold uppercase tracking-[0.2em] mb-6"
              style={{ color: wonConfig.accent }}
            >
              {wonItem.rapperRarity}
            </p>

            <div className="relative my-2 flex flex-col items-center justify-center sm:my-4">
              <div
                className="absolute w-48 h-48 rounded-full blur-[60px] opacity-40 animate-pulse pointer-events-none"
                style={{ backgroundColor: wonConfig.accent }}
              />

              <div className="absolute w-64 h-64 animate-spin-slow opacity-20 pointer-events-none">
                <div className="w-full h-px absolute top-1/2 blur-sm" style={{ backgroundColor: wonConfig.accent }} />
                <div className="w-full h-px absolute top-1/2 blur-sm rotate-45" style={{ backgroundColor: wonConfig.accent }} />
                <div className="w-full h-px absolute top-1/2 blur-sm rotate-90" style={{ backgroundColor: wonConfig.accent }} />
                <div className="w-full h-px absolute top-1/2 blur-sm -rotate-45" style={{ backgroundColor: wonConfig.accent }} />
              </div>

              <div className="relative z-10 origin-top scale-[0.58] animate-float pointer-events-none sm:scale-75 md:scale-100">
                <RapperCard
                  rapper={wonItem}
                  archiveNo={RAPPERS.indexOf(wonItem) + 1}
                  isUnlocked
                  isActive={false}
                />
              </div>
            </div>

            <div className="text-center space-y-1 relative z-10 mt-2">
              <p className="font-display text-xl font-extrabold uppercase tracking-[0.12em] text-white sm:text-2xl">
                {wonItem.name}
              </p>
              <p className="text-sm text-zinc-500 tracking-widest pt-3 border-t border-zinc-800">
                {isDuplicate ? 'Already in collection' : 'Added to collection'}
              </p>
            </div>

            <div className="mt-6 flex justify-center relative z-10">
              <button
                type="button"
                onClick={resetCase}
                className="px-10 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold tracking-widest uppercase transition-all border border-zinc-700 cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CasesTab;
