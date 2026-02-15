import { useSeasons } from "./useSeasons"
import { useStats } from "./useStats"
import { type PlayerInfoType } from "@/types/dofus"


export function usePlayerHistory() {

    const seasons = useSeasons()
    const { data, isLoading, isError } = useStats("Matchs", "A2:Z33")

    if (isLoading || isError || !data) return { data: undefined, isLoading, isError }


    const mergeSeasons = (pastSeasons: PlayerInfoType[][], currentSeason: PlayerInfoType[] ): PlayerInfoType[] => {

        const playerMap: Record<string, (string | null)[]> = {}

        pastSeasons.forEach(season => {
            season.forEach(([name, ...matches]) => {
                if (!playerMap[name]) playerMap[name] = [name]
                playerMap[name].push(...matches)
            })
        })

        currentSeason.forEach(([name, ...matches]) => {
            if (!playerMap[name]) playerMap[name] = [name]
            playerMap[name].push(...matches)
        })

        return Object.values(playerMap) as PlayerInfoType[]
    }

    const pastSeasons = (seasons?.seasons?.map(s => s.data) ?? []) as PlayerInfoType[][]
    const mergedData = mergeSeasons(pastSeasons, data)

    return { data: mergedData, isLoading, isError }
}
