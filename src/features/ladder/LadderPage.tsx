import { useMemo, useRef, useState } from "react"
import LadderElement from "@/features/ladder/LadderElement"
import { exportHtmlToImage } from "@/utils/exportHtmlToImage"
import Button from "@/components/UI/Button"
import { useStats } from "@/hooks/useStats"
import Loader from "@/components/UI/Loader"
import type { SheetRow } from "../stats/Rank"


export type playerLadderDataType = {
    name: string
    score: string
    perc?: string
    rank: number
    share: number
}


export default function LadderPage() {

    const { data, isLoading } = useStats("Ladder Focus", "C3:K31", "1oepSL-hQyxvzXHNL7BfKTKBG_8vIeB9TAxYtNBfGYMY")

    const totalMoney = Number(data?.[4]?.[8] ?? 10000000);// Donnée contenue dans K7 soit data[4][8]
    const [title, ] = useState("Classement ladder focus")
    const [period, ] = useState("5 Janvier au 18 Janvier")

    const ref = useRef<HTMLDivElement | null>(null)

    const playersData: playerLadderDataType[] = useMemo(() => {
        if (!data || !totalMoney) return [];
        console.log(data[0])

        const totalScore = data.reduce((sum: number, row: SheetRow) => sum + Number(row[1]?? 0), 0);

        return data
            .filter((row: SheetRow) => row[0])
            .map((row : SheetRow) => {

                const score = Number(row[1] ?? 0);
                const rawShare = (totalMoney * score) / totalScore;
                const share = Math.floor(rawShare / 1000) * 1000;

                return {
                    name: row[0],
                    score,
                    perc: row[3],
                    rank: 0,
                    share
                }
        })
    }, [data, totalMoney])

    const totalScore = playersData.reduce((total, player) => total + Number(player.score), 0)

    const players = playersData
        .filter(player => player.name !== null)
        .map(player => ({
            ...player,
            share: Math.floor((totalMoney * (Number(player.score) / totalScore)) / 1000) * 1000
        }))




    const rankedPlayers = useMemo(() => {

        const sorted = [...players].sort((a, b) => Number(b.score) - Number(a.score))

        return sorted.reduce<playerLadderDataType[]>((acc, player, index) => {
            const prev = acc[index - 1]

            const rank =
            index === 0
                ? 1
                : player.score === prev.score
                ? prev.rank
                : index + 1

            acc.push({ ...player, rank });

            return acc
        }, [])

    }, [players])


     if(isLoading) return <Loader message="Chargemen des données du Ladder" />

    const handleExportImage = async () => {
        await exportHtmlToImage(ref as React.RefObject<HTMLElement>, "ladder-omerta.png")
    }

    // Barrer les sommes de kamas des joueurs qui obtiennent un perc via ladder focus
    const mid = Math.ceil(rankedPlayers.length / 2)
    const leftColumn = rankedPlayers.slice(0, mid)
    const rightColumn = rankedPlayers.slice(mid)

    const dot = 
        <svg width="10" height="10" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#880D07"/>
        </svg>


    return (
    <div className="flex justify-center mt-6 mb-6">
        <div ref={ref}
        className="bg-[url(/images/bg-ally.png)] bg-center bg-no-repeat bg-cover w-[1414px] h-[855px] mx-auto text-white py-10 px-17 font-[Roboto]">

            <div className="grid grid-cols-2 grid-cols-[105px_600px] gap-9">
                <div className="w-[110px]">
                    <img className="w-[100%]" src="favicon.png"  alt="Blason Omerta, Alliance PVP n°1 sur Draconiros" />
                </div>

                <div>
                    <h1 className="font-bold text-3xl">{title}</h1>
                    <h2 className="font-thin text-4xl py-1">{period}</h2>
                </div>

            </div>

            <div className="w-[1020px] h-[580px] mx-auto flex flex-cols-2 gap-[90px] opacity-100">
                <ol className="flex flex-col overflow-hidden h-[100%]">
                    {leftColumn.map((player) => (
                        <LadderElement key={player.name} player={player} />
                    ))}
                </ol>

                <ol className="flex flex-col h-[100%]">
                    {rightColumn.map((player) => (
                        <LadderElement key={player.name} player={player} />
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

        </div>

    )
}
