import { RAPPERS } from "../lib/rappers"
import RapperCard from "../components/RapperCard"

  type Props = {
      rappers:string[],
      activeRapperId:string,

  }

const RapperCollectionTab = ({rappers, activeRapperId}:Props) => {
  return (
    <div className="relative overflow-hidden  w-[1000px]  h-auto mt-[100px] rounded-2xl mb-[100px]
        bg-gradient-to-b from-zinc-900 to-[#141414]     mx-auto items-start 
       shadow-[0_0_40px_rgba(255,255,255,0.06)] p-6">
        
           <h1 className="font-sans text-white text-4xl mt-4 mb-4 ml-24">Your Collection:{rappers.length} </h1>
        
       
      <div className="w-fit grid grid-cols-[repeat(3,250px)] gap-4  mx-auto">
      {
        RAPPERS.map(r=>{
           const isUnlocked = rappers.includes(r.id);
         const isActive = r.id === activeRapperId;

        return isUnlocked && (
          <RapperCard
            key={r.id}
            rapper={r}
            archiveNo={RAPPERS.indexOf(r) + 1}
            isUnlocked={isUnlocked}
            isActive={isActive}
          />
        );
        }
      
      )
      }
      
      </div>

      <h1 className="font-sans text-white text-4xl mt-4 mb-4 ml-24">Locked Rappers:{RAPPERS.length - rappers.length} </h1>
       <div className="w-fit grid grid-cols-[repeat(3,250px)] gap-4  mx-auto">
      {
        RAPPERS.map(r=>{
           const isUnlocked = rappers.includes(r.id);
         const isActive = r.id === activeRapperId;

        return !isUnlocked && (
          <RapperCard
            key={r.id}
            rapper={r}
            archiveNo={RAPPERS.indexOf(r) + 1}
            isUnlocked={isUnlocked}
            isActive={isActive}
          />
        );
        }
      
      )
      }
      
      </div>
    </div>
  )
}

export default RapperCollectionTab
