
import ClickerTab from "./tab/ClickerTab"
import CasesTab from "./tab/CasesTab.tsx"
import RapperCollectionTab from "./tab/RapperCollectionTab.tsx"

import BaseLayout from "./BaseLayout"
import type {click} from './lib/clicks.ts'
import type {tab} from './lib/tabs.ts'

import { useState, useRef } from "react"

function App() {

  const [leanMoney, setLeanMoney] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [clickMoney, setClickMoney] = useState<number>(1);

  const [leanPerSecond, setLeanPerSecond] = useState<number>()

  const [clicks, setClick] = useState<click[]>([]);

  const  [realTab, setRealTab] = useState<tab>('clicker');

  function handleTab(nowtab:tab){ 

    setRealTab(nowtab);

  }

  const clickTargetRef  = useRef<HTMLButtonElement|null>(null);

  const moneyPerClick = clickMoney*multiplier;

  function handleLeanMoney(){

    setLeanMoney(prev=>(prev+moneyPerClick));
    setClickMoney(clickMoney);
    setMultiplier(multiplier);
  }

  function handleMoneyAnimation(e:React.MouseEvent){

    if(clickTargetRef.current){

      const rect = clickTargetRef.current.getBoundingClientRect();

      const clickObject : click = {

      id:Date.now(),
      x:e.clientX-rect.left,
      y:e.clientY-rect.top,
      value:moneyPerClick,  


    }

    setClick(prev=> [...prev, clickObject])

      setTimeout(()=>{
        setClick(prev=>prev.filter(c=>c.id!==clickObject.id ));
      }, 800)

    }



  }



  return (
    <>
    <BaseLayout realTab={realTab} handleTab={handleTab} money={leanMoney} moneyPerClick={moneyPerClick}>
    
   
      
   {
      realTab==='clicker'&&
    (<ClickerTab handleLeanMoney={handleLeanMoney}
     clickTargetRef={clickTargetRef} handleMoneyAnimation={handleMoneyAnimation}
     clicks={clicks}/>
    )
      }

      {
          realTab==="cases"&&(
            <CasesTab/>
          )

      }

      {
        realTab==="collection"&&(
            <RapperCollectionTab/>
        )
      
      }


  </BaseLayout>

    </>
  )
}

export default App
