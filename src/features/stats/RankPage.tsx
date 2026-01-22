import { useStats } from "@/hooks/useStats"
import { useState } from "react"
import Rank from "./Rank"
import rankSeasonOne from "@/data/season-1-definitive-rank.json"
import Button from "@/components/UI/Button"

export default function RankPage() {

    const { data, isLoading } = useStats("Saison", "B1")

    let currentSeason = 1
    if(data) currentSeason =  data[0][0]

    const [seasonDisplayed, setSeasonDisplayed] = useState(currentSeason)

    return (<>

        {isLoading && <p className="text-[rgb(var(--text))] text-center text-xl mb-8">Chargement...</p>}
        
        <div className="flex flex-cols-1 gap-2 mt-8 w-fit mx-auto">
            <Button text="Saison 1" action={() => setSeasonDisplayed(1)} 
            color={seasonDisplayed === 1 ? "" : "bg-[rgb(var(--text))]"}
            textColor={seasonDisplayed === 1 ? "" : "text-[rgb(var(--bg))]"} />
            <Button text="Saison 2" action={() => setSeasonDisplayed(2)} 
            color={seasonDisplayed === 2 ? "" : "bg-[rgb(var(--text))]"}
            textColor={seasonDisplayed === 2 ? "" : "text-[rgb(var(--bg))]"} />
        </div>

        {seasonDisplayed === currentSeason 
            ? <Rank page="Classement" range="B2:G25" title={"Classement S" + currentSeason + " (en cours)"} /> 
            : <Rank title="Classement S1" file={rankSeasonOne} />
        }

    </>)
}
