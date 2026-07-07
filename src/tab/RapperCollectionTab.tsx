import { RAPPERS } from "../lib/rappers"
import RapperCard from "../components/RapperCard"

const RapperCollectionTab = () => {
  return (
    <div className="flex justify-center pt-10">
      <RapperCard rapper={RAPPERS[4]} archiveNo={5} />
    </div>
  )
}

export default RapperCollectionTab
