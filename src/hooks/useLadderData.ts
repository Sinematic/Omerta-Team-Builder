import type { LadderType } from "@/features/ladder/LadderPage"
import { useStats } from "./useStats"
import { useMemo } from "react"
import type { SheetRow } from "@/features/stats/Rank"
import type { PlayerDataType } from "@/features/stats/PlayerHistory"


export type PlayerLadderDataType = {
    name: string
    score: number
    perc?: string
    rank: number
    share: number
    allowedHotSpot: boolean
    focusScore: number
    extraPerc?: boolean
}


export default function useLadderData(page: LadderType, sheetID: string) {

    const { data: ladderData, isLoading: isLoadingLadder } = useStats(page, "C3:M40", sheetID)
    const { data: metaData, isLoading: isLoadingMeta } = useStats("Données", "B22", sheetID)

    const totalMoney =
        page === "Ladder Classique"
        ? Number(ladderData?.[12]?.[10]) || 20000000
        : Number(ladderData?.[4]?.[8]) || 10000000

    const limit = 
        page === "Ladder Classique" ? Number(ladderData?.[11]?.[10]) || 20
        : (page === "Ladder Focus" ? Number(ladderData?.[3]?.[8]) : 999)

    const period = metaData?.[0]?.[0] ?? "Période non renseignée"

    const rankedPlayers = useMemo<PlayerLadderDataType[]>(() => {
        if (!ladderData?.length) return []

        // 1. Normalisation
        const players = ladderData
        .filter((row: SheetRow) => row[0])
        .map((row: SheetRow) => ({
            name: typeof row[0] === "string" ? row[0].replace(/-.*/, "") : null,
            score: Number(row[1] ?? 0),
            perc: row[3],
            rank: 0,
            share: 0,
            allowedHotSpot: row[4] === "X",
            focusScore: Number(row[6] ?? 0)
        }))
        .filter((p: PlayerDataType) => p.name !== null)
        // 2. Tri + limit
        const topPlayers = [...players]
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)

        const totalScore = topPlayers.reduce((sum, p) => sum + p.score, 0)
        const withShares = topPlayers.map(p => ({
            ...p,
            share: Math.round((totalMoney * (p.score / totalScore)) / 1000) * 1000
        }))
        
        const ranked = [...withShares].sort((a, b) => b.score - a.score)

        return ranked.reduce<PlayerLadderDataType[]>((acc, player, index) => {
        const prev = acc[index - 1]
        const rank =
            index === 0 ? 1 :
            player.score === prev.score ? prev.rank :
            index + 1

        acc.push({ ...player, rank })
        return acc
        }, [])
    }, [ladderData, limit, totalMoney])

    const rankedPlayersWithBonus = useMemo(() => {
        if (!rankedPlayers.length) return rankedPlayers

        const bonusWinners = [...rankedPlayers]
            .filter(p => Number(p.perc ?? 0) < 4)
            .sort((a, b) => {
            if (b.focusScore !== a.focusScore) return b.focusScore - a.focusScore
            return b.score - a.score
            })
            .slice(0, 3)

        const bonusNames = new Set(bonusWinners.map(p => p.name))

        return rankedPlayers.map(player => ({
            ...player,
            extraPerc: bonusNames.has(player.name)
        }))
    }, [rankedPlayers])

    console.log(rankedPlayersWithBonus)


    return {
        isLoading: isLoadingLadder || isLoadingMeta,
        period,
        totalMoney,
        rankedPlayers: rankedPlayersWithBonus
    }
}