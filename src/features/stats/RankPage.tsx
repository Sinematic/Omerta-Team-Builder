import { useStats } from "@/hooks/useStats"
import { useState } from "react"
import Rank from "./Rank"
import Button from "@/components/UI/Button"
import rankSeasonOne from "@/data/seasons/season-1-rank.json"
import rankSeasonTwo from "@/data/seasons/season-2-rank.json"
import clsx from "clsx"


type Season =
  | { title: string; file: (string | number | null)[][]; range?: never }
  | { title: string; range: string; file?: never }


export default function RankPage() {

    const { data, isLoading } = useStats("Saison", "B1")

    let currentSeason = 3
    if(data) currentSeason = data[0][0]

    const [seasonDisplayed, setSeasonDisplayed] = useState(currentSeason)

    const seasons : Record<number, Season> = {
        1: { title: "Classement S1", file: rankSeasonOne },
        2: { title: "Classement S2", file: rankSeasonTwo },
        3: { title: `Classement S3 (en cours)`, range: "B2:G25" },
    }
    
    const season = seasons[seasonDisplayed]
    

    return (<>

        {isLoading && <p className="text-[rgb(var(--text))] text-center text-xl my-8">Chargement...</p>}
        
        <div className={clsx(
            "flex flex-cols-1 gap-2 w-fit mx-auto",
            isLoading ? "mt-9" : "mt-24"
        )}>
            {Array.from({ length: currentSeason }, (_, i) => {
                const seasonNumber = i + 1
                const isActive = seasonDisplayed === seasonNumber

                return (
                    <Button key={seasonNumber} text={`Saison ${seasonNumber}`} action={() => setSeasonDisplayed(seasonNumber)}
                    color={isActive ? "" : "bg-[rgb(var(--text))]"} textColor={isActive ? "" : "text-[rgb(var(--bg))]"}/>
                )
            })}
        </div>

        <Rank page="Classement" title={season.title} file={season.file} range={season.range} />

    </>)
}
