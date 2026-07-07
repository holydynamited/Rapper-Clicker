
import Header from './components/Header'

import type {tab} from './lib/tabs'




type Props = {
  children: React.ReactNode; 
  money:number;
  moneyPerClick: number;
  handleTab: (tab:tab)=> void;
  realTab :tab
}

const BaseLayout = ({ children, money, moneyPerClick, handleTab , realTab}: Props) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0c10]">
    
        <Header money={money} moneyPerClick={moneyPerClick} handleTab={handleTab}
        realTab={realTab}
        />
      
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  )
}

export default BaseLayout
