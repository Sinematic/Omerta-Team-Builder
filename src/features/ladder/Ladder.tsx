import { useRef, type SetStateAction } from "react"
import LadderElement from "@/features/ladder/LadderElement"
import { exportHtmlToImage } from "@/utils/exportHtmlToImage"
import Button from "@/components/UI/Button"
import Loader from "@/components/UI/Loader"
import type { LadderType } from "./LadderPage"
import useLadderData from "@/hooks/useLadderData"


export default function Ladder({ page, setPage } : { page: LadderType, setPage: React.Dispatch<SetStateAction<"" | LadderType>> }) {

    const ref = useRef<HTMLDivElement | null>(null)

    const { isLoading, period, totalMoney, rankedPlayers } = useLadderData(page, "1oepSL-hQyxvzXHNL7BfKTKBG_8vIeB9TAxYtNBfGYMY")

    if(isLoading) return <Loader message="Chargement des données du Ladder" />

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
        className="bg-[url(/images/wallpapers/bg-ally.png)] bg-center bg-no-repeat bg-cover w-[1414px] h-[870px] mx-auto text-white pt-10 px-17 font-[Roboto]">

            <div className="grid grid-cols-[105px_600px] gap-9">
                <div className="w-[110px] scale-160">
                    <img className="w-[100%]" src="favicon.png" alt="Blason Omerta, Alliance PVP n°1 sur Draconiros" />
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
                        <img src="images/icons/kama.webp" alt="Le Kama, coeur de Dofus" />
                    </div>

                    <p className="text-2xl font-thin flex">{(totalMoney / 1000000)} millions sont répartis sur ce ladder <span className="pl-6 pt-3">{dot}</span></p>
                </div>

            </div>

            <div className="no-export absolute top-15 left-10 grid grid-cols-[1fr] gap-4">
                <Button text="Retour" specifiedClasses="w-full" action={() => setPage("")} color="bg-[rgb(var(--warning))]" />
                <Button text="Exporter Ladder" specifiedClasses="w-full" action={handleExportImage} />
            </div>

        </div>

    )
}
