
import { Volume2, VolumeX } from 'lucide-react';

import type {tab} from'../lib/tabs'

type Props = {
    money :number,
    moneyPerClick:number,
    handleTab:(tab:tab)=>void,
    realTab:tab,
    leanPerSecond:number,
    isMuted: boolean,
    onToggleMute: () => void,
}

const Header = ({money,moneyPerClick, handleTab, realTab, leanPerSecond, isMuted, onToggleMute}:Props) => {
  return (
    <div className="sticky top-0 left-0 z-1000 w-full bg-[#191919] uppercase shadow-lg shadow-fuchsia-950 pt-safe">
      <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-start">
          <nav className="flex">
            <ul className="flex items-center gap-2 rounded-xl border border-zinc-800/50 bg-zinc-950/60 px-3 py-2 text-sm font-bold text-[#888888] sm:gap-4 sm:px-6 sm:text-xl">
              <li
                className={`cursor-pointer whitespace-nowrap ${realTab === 'clicker' ? 'text-white' : 'transition-colors duration-200 hover:text-white'}`}
                onClick={()=>handleTab('clicker')}
              >
                Clicker
              </li>
              <li
                className={`cursor-pointer whitespace-nowrap ${realTab === 'cases' ? 'text-white' : 'transition-colors duration-200 hover:text-white'}`}
                onClick={()=>handleTab('cases')}
              >
                Cases
              </li>
              <li
                className={`cursor-pointer whitespace-nowrap ${realTab === 'collection' ? 'text-white' : 'transition-colors duration-200 hover:text-white'}`}
                onClick={()=>handleTab('collection')}
              >
                Collection
              </li>
            </ul>
          </nav>

          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-zinc-800/50 bg-zinc-950/60 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        <div className="grid w-full grid-cols-3 gap-2 rounded bg-[#191919] text-center sm:w-auto sm:gap-4 sm:text-right">
          <div className="min-w-0 px-1 sm:pl-4">
            <span className="block text-[10px] tracking-widest text-zinc-500 sm:text-xs">Balance</span>
            <span className="block truncate text-sm font-black text-purple-400 sm:text-base">{money} $</span>
          </div>
          <div className="min-w-0 px-1 sm:pl-4">
            <span className="block text-[10px] tracking-widest text-zinc-500 sm:text-xs">Per click</span>
            <span className="block truncate text-sm font-black text-purple-400 sm:text-base">+{moneyPerClick}</span>
          </div>
          <div className="min-w-0 px-1 sm:pl-4">
            <span className="block text-[10px] tracking-widest text-zinc-500 sm:text-xs">Per sec</span>
            <span className="block truncate text-sm font-black text-purple-400 sm:text-base">+{leanPerSecond}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
