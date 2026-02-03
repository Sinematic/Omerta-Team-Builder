import { useMemo, useRef } from "react"
import LadderElement from "@/features/ladder/LadderElement"
import { exportHtmlToImage } from "@/utils/exportHtmlToImage"
import Button from "@/components/UI/Button"
import { useStats } from "@/hooks/useStats"
import Loader from "@/components/UI/Loader"
import type { SheetRow } from "../stats/Rank"
import type { LadderType } from "./LadderPage"


export type PlayerLadderDataType = {
    name: string
    score: number
    perc?: string
    rank: number
    share: number
    allowedHotSpot: boolean
}


export default function Ladder({ page } : { page: LadderType}) {

    const { data: ladderData, isLoading: isLoadingLadder } = useStats(page, "C3:M40", "1oepSL-hQyxvzXHNL7BfKTKBG_8vIeB9TAxYtNBfGYMY")
    const { data: metaData, isLoading: isLoadingMeta } = useStats("Données", "B22", "1oepSL-hQyxvzXHNL7BfKTKBG_8vIeB9TAxYtNBfGYMY") 

    const totalMoney = page === "Ladder Classique" ? (Number(ladderData?.[12]?.[10]) || 20000000) : (Number(ladderData?.[4]?.[8]) || 10000000) // Donnée contenue dans K7 soit data[4][8]
    const period = metaData?.[0]?.[0] ?? "Période non renseignée" // Donnée contenue dans B22
    const limit = page === "Ladder Classique" ? (Number(ladderData?.[11]?.[9]) || 20) : 999

    const ref = useRef<HTMLDivElement | null>(null)

    const playersData: PlayerLadderDataType[] = useMemo(() => {

        if (!ladderData) return []

        return ladderData
            .filter((row: SheetRow) => row[0])
            .map((row : SheetRow) => {
                return {
                    name: typeof row[0] ==="string" ? row[0].replace(/-.*/, "") : null,
                    score: row[1] ?? 0,
                    perc: row[3],
                    rank: 0,
                    share: 0,
                    allowedHotSpot: row[4] === "X"
                }
        })
    }, [ladderData])

    const topPlayers = useMemo(() => {
        if (!playersData.length) return []

        return [...playersData]
            .sort((a, b) => b.score - a.score)
            .slice(0, limit)
        }, [playersData, limit]
    )

        const totalScore = topPlayers.reduce((total, player) => total + Number(player.score), 0)

        const players = topPlayers
            .filter(player => player.name !== null)
            .map(player => ({
                ...player,
                share: Math.round((totalMoney * (player.score / totalScore)) / 1000) * 1000
            })
        )

    const tempPlayers = useMemo(() => {

        const sorted = [...players].sort((a, b) => b.score - a.score)

        return sorted.reduce<PlayerLadderDataType[]>((acc, player, index) => {
            const prev = acc[index - 1]

            const rank =
            index === 0
                ? 1
                : player.score === prev.score
                ? prev.rank
                : index + 1

            acc.push({ ...player, rank })

            return acc
        }, [])

    }, [players])

    const rankedPlayers = tempPlayers.filter(player => player.rank <= limit)

    if(isLoadingLadder || isLoadingMeta) return <Loader message="Chargement des données du Ladder" />

    const handleExportImage = async () => {
        await exportHtmlToImage(ref as React.RefObject<HTMLElement>, page.replace(' ', '-').toLowerCase() + ".png")
    }

    const mid = Math.ceil(rankedPlayers.length / 2)
    const leftColumn = rankedPlayers.slice(0, mid)
    const rightColumn = rankedPlayers.slice(mid)

    const dot = 
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#880D07"/>
        </svg>


    return (
        <div ref={ref}
        className="bg-[url(/images/bg-ally.png)] bg-center bg-no-repeat bg-cover w-[1414px] h-[870px] mx-auto text-white pt-10 px-17 font-[Roboto]">

            <div className="grid grid-cols-[105px_600px] gap-9">
                <div className="w-[110px] scale-160">
                    <img className="w-[100%]" src="favicon.png"  alt="Blason Omerta, Alliance PVP n°1 sur Draconiros" />
                </div>

                <div>
                    <h1 className="font-bold text-3xl">{page}</h1>
                    <h2 className="font-thin text-4xl py-1">{period}</h2>
                </div>

            </div>

            <div className="w-[1020px] h-[580px] mx-auto flex gap-[90px] opacity-100">
                <ol className="flex flex-col overflow-hidden h-[100%]">
                    {leftColumn.map((player) => (
                        <LadderElement key={player.name} player={player} ladderType={page} />
                    ))}
                </ol>

                <ol className="flex flex-col h-[100%]">
                    {rightColumn.map((player) => (
                        <LadderElement key={player.name} player={player} ladderType={page} />
                    ))}
                </ol>
            </div>

            <div className="w-fit mx-auto pt-5">
                <p className="mx-auto font-bold text-2xl">Les récompenses sont calculées en fonction de vos points ladder.</p>

                <div className="pt-1 w-fit mx-auto flex flex-cols-2 gap-5 place-items-center">
                    <div className="w-[60px]">
                        <img src="images/kama.webp" alt="Le Kama, coeur de Dofus" />
                    </div>

                    <p className="text-2xl font-thin flex">{(totalMoney / 1000000)} millions sont répartis sur ce ladder <span className="pl-6 pt-3">{dot}</span></p>
                </div>

            </div>

            <Button text="Exporter Ladder" specifiedClasses="no-export absolute top-5 left-5" action={handleExportImage}/>

        </div>

    )
}
