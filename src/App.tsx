import { useState, useRef, useEffect } from "react"

import BaseLayout from "./BaseLayout"
import ClickerTab from "./tab/ClickerTab"
import CasesTab from "./tab/CasesTab.tsx"
import RapperCollectionTab from "./tab/RapperCollectionTab.tsx"

import type {click} from './lib/clicks.ts'
import type {tab} from './lib/tabs.ts'
import type { rapper,rarity } from "./lib/rappers.ts"

import {RAPPERS} from './lib/rappers.ts'
import { loadSave, writeSave } from './lib/save.ts'
import { playRapperPreview, stopRapperPreview, getInitialMuted, setMuted } from './lib/audio.ts'

const DEFAULT_ACTIVE_ID = 'yeat';
const defaultRapper = RAPPERS.find(r => r.id === DEFAULT_ACTIVE_ID);
const saved = loadSave();

function App() {

 // # 1. GAME CORE STATES
  const [leanMoney, setLeanMoney] = useState<number>(saved?.leanMoney ?? 0);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [clickMoney, setClickMoney] = useState<number>(1);
  const [realTab, setRealTab] = useState<tab>('clicker');

  // # 2. RAPPER SYSTEM STATES
  const [activeRapperId, setActiveRapperId] = useState<string>(saved?.activeRapperId ?? DEFAULT_ACTIVE_ID);
  const [rappers, setRappers] = useState<string[]>(saved?.rappers ?? [DEFAULT_ACTIVE_ID]);
  const activeRapper = RAPPERS.find(r=>r.id===activeRapperId);
  const [leanPerSecond, setLeanPerSecond] = useState<number>(
    saved?.leanPerSecond ?? defaultRapper?.leanPerSecond ?? 0,
  );

  // # 3. CLICK ANIMATION STATES & REFS
  const clickTargetRef  = useRef<HTMLButtonElement|null>(null);
  const [clicks, setClick] = useState<click[]>([]);
  const [isMuted, setIsMuted] = useState(getInitialMuted);

  // # 4. GAME CALCULATIONS
  const moneyPerClick = (activeRapper?.clickPower||0)*multiplier;

  const DUPLICATE_REFUND: Record<rarity, number> = {
  common: 100,
  rare: 200,
  epic: 350,
  arcane: 450,
  }

  // # 5. SIDE EFFECTS
  useEffect(() => {
    writeSave({ leanMoney, rappers, activeRapperId, leanPerSecond });
  }, [leanMoney, rappers, activeRapperId, leanPerSecond]);

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

  function handleToggleMute() {
    const next = !isMuted;
    setIsMuted(next);
    setMuted(next);
  }

  function handleTab(nowtab:tab){ 
    stopRapperPreview();
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

    playRapperPreview(id);
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
    <BaseLayout
      realTab={realTab}
      handleTab={handleTab}
      money={leanMoney}
      moneyPerClick={moneyPerClick}
      leanPerSecond={leanPerSecond}
      isMuted={isMuted}
      onToggleMute={handleToggleMute}
    >
    
   
      
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
