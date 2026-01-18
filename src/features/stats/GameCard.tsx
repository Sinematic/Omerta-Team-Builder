import type { MatchDataType, ParticipantType, } from "./PlayerHistory"
import PlayerElement from "@/components/UI/PlayerElement"


export default function GameCard({ matchData, pseudo } : { matchData : MatchDataType, pseudo : string }) {

    if (!matchData) return

    const targetData = matchData.participants.find(p => p.name === pseudo) as ParticipantType

    const playerSide = matchData.participants.filter(p => p.match!.side === targetData.match!.side)
    const ennemiesSide = matchData.participants.filter(p => p.match!.side !== targetData.match!.side)

    const teams = { playerSide, ennemiesSide }

    
    return (
        <div className={"w-full px-8 py-4 flex rounded-xl justify-between items-center border-solid border-3 select-none shadow-lg  " +
        (targetData.match!.result === "W" 
        ? "bg-[rgb(var(--bg))] border-[rgb(var(--primary-blue))]" 
        : "bg-gray-900 border-[rgb(var(--danger))]")}>
            <ul className="flex-1">
                {teams.playerSide.map(player => (
                    <PlayerElement player={player} target={targetData.name === player.name} key={player.name} /> 
                ))}
            </ul>

            <h3 className={"text-3xl flex-shrink-0 font-bold " + (targetData.match!.result === "W" ? "text-[rgb(var(--primary-blue))]" : "text-red-600")}>
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
