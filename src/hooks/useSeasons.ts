import { getSeasonsUntil } from "@/utils/seasons"
import { useStats } from "./useStats"
import { useMemo } from "react"


export function useSeasons() {

    const { data, isLoading, isError } = useStats("Saison", "B1")

    const currentSeason = data?.[0]?.[0]

    const seasons = useMemo(() => 
        (currentSeason ? getSeasonsUntil(currentSeason) : undefined),
        [currentSeason]
    )

    return { seasons, isLoading, isError }

}
