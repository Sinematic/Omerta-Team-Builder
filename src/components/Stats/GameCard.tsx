import type { MatchDataType, ParticipantType } from "./PlayerHistory"
import { useMemo } from "react"
import PlayerElement from "../UI/PlayerElement"



export default function GameCard({ matchData} : { matchData : MatchDataType }) {

    const { teams, targetData } = useMemo(() => {

        const sorted = matchData.participants.sort((a : ParticipantType, ) => a.match!.side === matchData.participants[0].match!.side ? -1 : 1)
        const mid = Math.floor(sorted.length / 2)

        const teams = {
            playerSide: sorted.slice(0, mid),
            ennemiesSide: sorted.slice(mid)
        }
        
        return {
            teams,
            targetData: teams.playerSide[0]
        }

    }, [matchData])

    if (!targetData) return

    
    return (
        <div className={"w-full px-8 py-4 flex rounded-xl justify-between items-center border-solid border-3 select-none shadow-lg  " +
        (targetData.match!.result === "W" ? "bg-gray-800 border-blue-500" : "bg-gray-900 border-red-600")}>
            <ul className="flex-1">
                {teams.playerSide.map(player => (
                    <PlayerElement player={player} target={targetData.name === player.name} key={player.name} /> 
                ))}

                {targetData.name}
            </ul>

            <h3 className={"text-3xl flex-shrink-0 font-bold " + (targetData.match!.result === "W" ? "text-blue-500" : "text-red-600")}>
                {targetData.match!.result === "W" ? "VICTOIRE" : "DÉFAITE"}
                <p className="text-xl">{"+" + targetData.match!.points}</p>
            </h3>

            <ul className="flex-1 flex flex-col items-end ">
                {teams.ennemiesSide.map(player => (
                    <PlayerElement player={player} target={teams.playerSide[0].name === player.name} reverse={true} key={player.name} /> 
                ))}
            </ul>
        </div>
    )
}
