
import Header from './components/Header'

import type {tab} from './lib/tabs'




type Props = {
  children: React.ReactNode;
  money: number;
  moneyPerClick: number;
  handleTab: (tab: tab) => void;
  realTab: tab;
  leanPerSecond: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

const BaseLayout = ({ children, money, moneyPerClick, handleTab, realTab, leanPerSecond, isMuted, onToggleMute }: Props) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0c10]">
        <Header
          money={money}
          moneyPerClick={moneyPerClick}
          handleTab={handleTab}
          leanPerSecond={leanPerSecond}
          realTab={realTab}
          isMuted={isMuted}
          onToggleMute={onToggleMute}
        />
      
      <div className="relative z-10 w-full min-h-screen px-3 pb-safe sm:px-4">
        {children}
      </div>
    </div>
  )
}

export default BaseLayout
