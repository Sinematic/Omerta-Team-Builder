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

    const period = metaData?.[0]?.[0] ?? "Période non renseignée"

    const ladderConfig = {
        "Ladder Classique": {
            coords: [12, 10],
            defaultValue: 20000000,
            limitCoords: [11, 10]
        },
        "Ladder Focus": {
            coords: [4, 8],
            defaultValue: 10000000,
            limitCoords: [3, 8]
        },
        "Ladder Event": {
            coords: [4, 7],
            defaultValue: 5000000,
            limitCoords: [3, 7]
        },
    } as const


    const config = ladderConfig[page]

    const totalMoney = config ? Number(ladderData?.[config.coords[0]]?.[config.coords[1]]) || config.defaultValue : 0
    const limit = config ? Number(ladderData?.[config.limitCoords[0]]?.[config.limitCoords[1]]) : 999

    const rankedPlayers = useMemo<PlayerLadderDataType[]>(() => {

        if (!ladderData?.length) return []

        const ladderStructure = {
            "Ladder Classique": {
                nameIndex: 0,
                scoreIndex: 1,
                percIndex: 3,
                focusIndex: 6,
            },
            "Ladder Focus": {
                nameIndex: 0,
                scoreIndex: 1,
                percIndex: 3,
                focusIndex: 6,
            },
            "Ladder Event": {
                nameIndex: 0,
                scoreIndex: 1,
                percIndex: 3,
                focusIndex: null,
            },
        } as const

        const structure = ladderStructure[page as keyof typeof ladderStructure]

        const players = ladderData
            .filter((row: SheetRow) => row[structure.nameIndex])
            .map((row: SheetRow) => ({
                name: typeof row[structure.nameIndex] === "string"
                    ? (row[structure.nameIndex] as string).replace(/-.*/, "")
                    : null,

                score: Number(row[structure.scoreIndex] ?? 0),

                perc: structure.percIndex !== undefined && structure.percIndex !== null
                    ? row[structure.percIndex]
                    : undefined,

                rank: 0,
                share: 0,

                allowedHotSpot: row[4] === "X",

                focusScore: structure.focusIndex !== undefined && structure.focusIndex !== null
                    ? Number(row[structure.focusIndex] ?? 0)
                    : 0,
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
                    index === 0 ? 1 
                    : (player.score === prev.score ? prev.rank : index + 1)

                acc.push({ ...player, rank })
                    return acc
            }, [])

    }, [ladderData, page, totalMoney, limit])

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


    return {
        isLoading: isLoadingLadder || isLoadingMeta,
        period,
        totalMoney,
        rankedPlayers: rankedPlayersWithBonus
    }
}