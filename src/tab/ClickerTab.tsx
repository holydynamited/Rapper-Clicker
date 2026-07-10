import lean from '../assets/doublecup.png';
import type {click} from '../lib/clicks.ts'

type Props = {

    handleLeanMoney: ()=>void;
    clickTargetRef:React.RefObject<HTMLButtonElement|null>;
    handleMoneyAnimation:(e:React.MouseEvent)=>void;
    clicks : click[];

}




const ClickerTab = ({handleLeanMoney, clickTargetRef,handleMoneyAnimation,clicks }:Props) => {
  return (
    <div className=" flex items-center
                     mx-auto justify-center
                     relative w-[400px] p-6 mt-[100px]  
                     overflow-hidden bg-gradient-to-b from-zinc-900 to-[#141414]
                     rounded-2xl
                     
                     
                     shadow-[0_0_40px_rgba(255,255,255,0.06)]
                     ">
    

   
       <div className='flex justify-center items-center'>
        <button className='cursor-pointer bg-transparent border-0 p-0 outline-none
          hover:scale-105 transition-transform duration-100'
          onClick={(e)=>{
            handleLeanMoney();
            handleMoneyAnimation(e);
          }}
          ref={clickTargetRef}
          >
            <img src={lean} alt="" />
        </button>
        {clicks.map(c=>(
        <div 
        key={c.id}
        style={{ left: c.x, top: c.y }}
        className="absolute pointer-events-none text-purple-400 text-xl font-extrabold animate-[floatUp_0.8s_ease-out_forwards] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          +{c.value}
        </div>
 
      ))}
         
       </div>
   
     
    </div>
  )
}

export default ClickerTab
