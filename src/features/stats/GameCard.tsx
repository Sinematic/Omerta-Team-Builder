import clsx from "clsx"
import type { MatchDataType, ParticipantType } from "@/features/stats/PlayerHistory"
import PlayerElement from "@/components/UI/PlayerElement"


export default function GameCard({ matchData, pseudo } : { matchData : MatchDataType, pseudo : string }) {

    if (!matchData) return

    const targetData = matchData.participants.find(p => p.name === pseudo) as ParticipantType

    const playerSide = matchData.participants.filter(p => p.match!.side === targetData.match!.side)
    const ennemiesSide = matchData.participants.filter(p => p.match!.side !== targetData.match!.side)

    const teams = { playerSide, ennemiesSide }

    
    return (
        <div className={clsx("w-full overflow-hidden px-8 py-4 flex flex-col md:flex-row rounded-xl justify-between items-center border-solid border-3 select-none shadow-lg  " +
        (targetData.match!.result === "W" 
            ? "bg-[rgb(var(--slate))] border-[rgb(var(--primary-blue))]" 
            : "bg-[rgb(var(--dark-orange))] border-[rgb(var(--danger))]"),
            )}>

            <ul className="flex-1">
                {teams.playerSide.map(player => (
                    <PlayerElement player={player} target={targetData.name === player.name} key={player.name} /> 
                ))}
            </ul>

            <h3 className={clsx("text-3xl flex-shrink-0 py-2 md:pb-0 font-bold flex-col md:flex-row " 
            + (targetData.match!.result === "W" ? "text-[rgb(var(--primary-blue))]" : "text-red-600")
            )}>
                {targetData.match!.result === "W" ? "VICTOIRE" : "DÉFAITE"}
                <p className="text-xl">{"+" + targetData.match!.points}</p>
            </h3>

            <ul className="flex-1 flex flex-col items-end">
                {teams.ennemiesSide.map(player => (
                    <PlayerElement player={player} target={teams.playerSide[0].name === player.name} reverse={true} key={player.name} /> 
                ))}
            </ul>
        </div>
    )
}
