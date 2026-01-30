import { useRef, useState } from "react"
import LadderElement from "@/features/ladder/LadderElement"
import { exportHtmlToImage } from "@/utils/exportHtmlToImage"
import Button from "@/components/UI/Button"


export type playerLadderDataType = {
    name: string
    score: string
    perc?: string
    rank: number
}


export default function LadderPage() {

    const [totalMoney, ] = useState(10000000)
    const [title, ] = useState("Classement ladder focus")
    const [period, ] = useState("5 Janvier au 18 Janvier")

    const ref = useRef<HTMLDivElement | null>(null)


    const players : playerLadderDataType[] = [
        { name: "Sinematic", score: "460", rank: 0 },
        { name: "Ospin", score: "420", rank: 0 },
        { name: "Dixite", score: "370", rank: 0 },
        { name: "Quasar", score: "270", rank: 0 },
        { name: "Saiyan", score: "230", rank: 0,  perc: "1"},
        { name: "Atalyah", score: "220", rank: 0 },
        { name: "Smoky", score: "200", rank: 0 },
        { name: "Atyla", score: "180", rank: 0, perc: "1" },
        { name: "Kulinaire", score: "170", rank: 0, perc: "1" },
        { name: "Harbat", score: "150", rank: 0 },
        { name: "Shankski", score: "140", rank: 0 },
        { name: "Neithya", score: "130", rank: 0 },
        { name: "Fumeur", score: "120", rank: 0 },
        { name: "Gump", score: "100", rank: 0 },
        { name: "Mojo", score: "100", rank: 0 },
        { name: "Fecafe", score: "90", rank: 0 },
        { name: "Shambala", score: "90", rank: 0 }, 
        { name: "Tykouette", score: "90", rank: 0 },
        { name: "Terahertz", score: "80", rank: 0 },
        { name: "Zenio", score: "60", rank: 0 },
        { name: "Vahalgrim", score: "40", rank: 0 },
        { name: "Zelenox", score: "40", rank: 0 },
        { name: "Damnor", score: "30", rank: 0 },
        { name: "Idhao", score: "30", rank: 0 },
        { name: "Dahlma", score: "20", rank: 0 },
        { name: "Jaardiland", score: "20", rank: 0 },
    ]


    let currentRank = 1 
    let previousScore: number | null = null

    const rankedPlayers = players.map((player, index) => {
        if (index === 0 || Number(player.score) !== previousScore) {
            currentRank = index + 1
            previousScore = Number(player.score)
        }

        return { ...player, rank: currentRank }
    })

    const handleExportImage = async () => {
        await exportHtmlToImage(ref as React.RefObject<HTMLElement>, "ladder-omerta.png")
    }



    const totalScore = players.reduce((total, player) => total + Number(player.score), 0)
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
                    {leftColumn.map((player, index) => (
                        <LadderElement key={player.name} player={player} position={index} 
                        share={new Intl.NumberFormat("fr-FR").format(Math.ceil(totalMoney * (Number(player.score) / totalScore)))} />
                    ))}
                </ol>

                <ol className="flex flex-col h-[100%]">
                    {rightColumn.map((player, index) => (
                        <LadderElement key={player.name} player={player} position={index} 
                        share={new Intl.NumberFormat("fr-FR").format(Math.ceil(totalMoney * (Number(player.score) / totalScore)))} />
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
