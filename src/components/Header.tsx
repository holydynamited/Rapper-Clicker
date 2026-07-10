

import type {tab} from'../lib/tabs'

type Props = {
    money :number,
    moneyPerClick:number,
    handleTab:(tab:tab)=>void,
    realTab:tab,
    leanPerSecond:number

}
    



const Header = ({money,moneyPerClick, handleTab, realTab, leanPerSecond}:Props) => {
  return (
    <div className='sticky flex top-0 left-0 h-20 w-screen bg-[#191919] z-1000 items-center justify-around  uppercase
    shadow-fuchsia-950
    
   
    shadow-lg
    '>
     
    
     
      <nav className='  px-6 py-4 flex'>
        <ul className='flex    items-center gap-4  text-xl font-bold text-[#888888] bg-zinc-950/60 px-6 py-2 rounded-xl border border-zinc-800/50'>
            <li className={`
                 ${realTab === 'clicker' ? 'text-white cursor-pointer' : 'hover:text-white transition-colors duration-200 cursor-pointer'}
            `}
             onClick={()=>handleTab('clicker')}
             >
            Clicker 
          </li>
          <li className={`
        ${realTab === 'cases' ? 'text-white cursor-pointer' : 'hover:text-white transition-colors duration-200 cursor-pointer'}
        `}
          onClick={()=>handleTab('cases')}>
          
            Cases
          </li>
          <li className={`
        ${realTab === 'collection' ? 'text-white cursor-pointer' : 'hover:text-white transition-colors duration-200 cursor-pointer'}
        `}
          onClick={()=>handleTab('collection')}
          >
           Collection
          </li>


          
        </ul>

      </nav>

      
        <div className='flex rounded text-l bg-[#191919]'>

       <div className='text-right pl-4   '>
   
            <span className="block   text-zinc-500 uppercase tracking-widest">Balance:</span>
            <span className="text-purple-400 font-black ">{money} $</span>
          </div>
          <div className="text-right  pl-4">
            <span className="block  text-zinc-500 uppercase tracking-widest">Cash per click</span>
            <span className="text-purple-400 font-black ">+{moneyPerClick}</span>
          </div>
          <div className="text-right  pl-4">
            <span className="block  text-zinc-500 uppercase tracking-widest">Lean per second:</span>
            <span className="text-purple-400 font-black ">+{leanPerSecond}</span>
          </div>

          </div>

      
    </div>
  )
}

export default Header
