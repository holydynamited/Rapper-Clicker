import { RAPPERS } from "../lib/rappers"
import RapperCard from "../components/RapperCard"

type Props = {
  rappers: string[];
  activeRapperId: string;
  selectActiveRapper: (id: string) => void;
}

const sectionTitleClass =
  "font-sans text-white text-2xl sm:text-4xl mt-2 mb-4 px-2 text-center sm:text-left sm:ml-8 lg:ml-24";

const gridClass =
  "mx-auto grid w-full max-w-[820px] grid-cols-1 place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3";

const RapperCollectionTab = ({ rappers, activeRapperId, selectActiveRapper }: Props) => {
  return (
    <div className="relative mx-auto mb-16 mt-16 w-full max-w-[1000px] overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900 to-[#141414] p-3 shadow-[0_0_40px_rgba(255,255,255,0.06)] sm:mt-24 sm:p-6">
      <h1 className={sectionTitleClass}>Your Collection: {rappers.length}</h1>

      <div className={gridClass}>
        {RAPPERS.map(r => {
          const isUnlocked = rappers.includes(r.id);
          const isActive = r.id === activeRapperId;

          return isUnlocked ? (
            <RapperCard
              key={r.id}
              rapper={r}
              archiveNo={RAPPERS.indexOf(r) + 1}
              isUnlocked={isUnlocked}
              isActive={isActive}
              onClick={() => selectActiveRapper(r.id)}
            />
          ) : null;
        })}
      </div>

      {rappers.length !== RAPPERS.length && (
        <>
          <h1 className={`${sectionTitleClass} mt-8`}>
            Locked Rappers: {RAPPERS.length - rappers.length}
          </h1>
          <div className={gridClass}>
            {RAPPERS.map(r => {
              const isUnlocked = rappers.includes(r.id);
              const isActive = r.id === activeRapperId;

              return !isUnlocked ? (
                <RapperCard
                  key={r.id}
                  rapper={r}
                  archiveNo={RAPPERS.indexOf(r) + 1}
                  isUnlocked={isUnlocked}
                  isActive={isActive}
                />
              ) : null;
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default RapperCollectionTab
