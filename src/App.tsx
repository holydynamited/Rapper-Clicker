import { useState, useRef, useEffect } from "react"

import BaseLayout from "./BaseLayout"
import ClickerTab from "./tab/ClickerTab"
import CasesTab from "./tab/CasesTab.tsx"
import RapperCollectionTab from "./tab/RapperCollectionTab.tsx"

import type {click} from './lib/clicks.ts'
import type {tab} from './lib/tabs.ts'
import type { rapper,rarity } from "./lib/rappers.ts"

import {RAPPERS} from './lib/rappers.ts'


function App() {

 // # 1. GAME CORE STATES
  const [leanMoney, setLeanMoney] = useState<number>(10000);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [clickMoney, setClickMoney] = useState<number>(1);
  const [realTab, setRealTab] = useState<tab>('clicker');

  // # 2. RAPPER SYSTEM STATES
  const [activeRapperId, setActiveRapperId] = useState<string>('yeat');
  const [rappers, setRappers] = useState<string[]>(['yeat']);
  const activeRapper = RAPPERS.find(r=>r.id===activeRapperId);
  const [leanPerSecond, setLeanPerSecond] = useState<number>((activeRapper.leanPerSecond)||0);

  // # 3. CLICK ANIMATION STATES & REFS
  const clickTargetRef  = useRef<HTMLButtonElement|null>(null);
  const [clicks, setClick] = useState<click[]>([]);

  // # 4. GAME CALCULATIONS
  const moneyPerClick = (activeRapper?.clickPower||0)*multiplier;

  const DUPLICATE_REFUND: Record<rarity, number> = {
  common: 100,
  rare: 200,
  epic: 350,
  arcane: 450,
  }

  // # 5. SIDE EFFECTS
  useEffect(()=>{
    if(leanPerSecond>0){ 
      const intervalId = setInterval(()=>{
      setLeanMoney(m=>m+leanPerSecond);
    },1000);
   return()=>clearInterval(intervalId);
  }
   
  }, [leanPerSecond])

  // # 6. CORE GAME ACTIONS
  function handleLeanMoney(){
    setLeanMoney(prev=>(prev+moneyPerClick));
    setClickMoney(clickMoney);
    setMultiplier(multiplier);
  }

  function handleTab(nowtab:tab){ 
    setRealTab(nowtab);
  }

  function handleCaseRapper(r:rapper){
    if(leanMoney>=500){
      setLeanMoney(m => m - 500);
      const haveRapper = rappers.includes(r.id);

    if(haveRapper){
       setLeanMoney(m => m + DUPLICATE_REFUND[r.rapperRarity]);
    return;

    }

    setRappers(prev=>[...prev,r.id])
    }
    

  }

  function handleSelectActiveRapper(id:string){

    if(!rappers.includes(id)) return;

    setActiveRapperId(id);

    const rapper = RAPPERS.find(r=>r.id===id);

    if(rapper) setLeanPerSecond(rapper.leanPerSecond);

  }

  // # 7. VISUAL EFFECTS
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
    <BaseLayout realTab={realTab} handleTab={handleTab} money={leanMoney} moneyPerClick={moneyPerClick} leanPerSecond={leanPerSecond}>
    
   
      
   {
      realTab==='clicker'&&
    (<ClickerTab handleLeanMoney={handleLeanMoney}
     clickTargetRef={clickTargetRef} handleMoneyAnimation={handleMoneyAnimation}
     clicks={clicks}/>
    )
      }

      {
          realTab==="cases"&&(
            <CasesTab  handleCaseRapper={handleCaseRapper} rappers={rappers} leanMoney={leanMoney}/>
          )

      }

      {
        realTab==="collection"&&(
            <RapperCollectionTab rappers={rappers} activeRapperId={activeRapperId} selectActiveRapper={handleSelectActiveRapper} />
        )
      
      }


  </BaseLayout>

    </>
  )
}

export default App
