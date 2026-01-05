import classesData from "@/data/classes.json"
import type { MatchDataType } from "./PlayerHistory"
import { useNavigate } from "react-router"

type ClassInDofusType = keyof typeof classesData

export default function GameCard({ matchData } : MatchDataType) {

    const classesInfo = classesData

    const navigate = useNavigate()

    const getClassData = (classInDofus: ClassInDofusType ) => classesInfo[classInDofus]

    const sortedParticipants = matchData.participants.sort((a) => a.match.side === matchData.participants[0].match.side ? -1 : 1)
    const mid = Math.floor(sortedParticipants.length / 2)

    const teams = {
        playerSide: sortedParticipants.slice(0, mid),
        ennemiesSide: sortedParticipants.slice(mid)
    }

    const targetData = teams.playerSide[0].match

    
    return (
    <div className={"w-full px-8 py-4 flex rounded-xl justify-between items-center border-solid border-3 select-none " +
    (targetData.result === "W" ? "bg-gray-800 border-blue-500" : "bg-gray-900 border-red-600")}>
        <ul className="flex-1">
            {teams.playerSide.map(player => (
                <li key={player.name} className="text-xl flex gap-4 cursor-pointer" 
                onClick={() => navigate("/stats/" + player.name.toLowerCase())}>
                <p className="min-w-[120px]">{player.name}</p>
                    <div className="w-[1lh] h-[1lh] rounded-full overflow-hidden">
                        <img src={getClassData(player.match.classPlayed).image} className="w-full h-full object-cover" />
                    </div>

                </li>
            ))}
        </ul>

        <h3 className={"text-3xl flex-shrink-0 font-bold " + (targetData.result === "W" ? "text-blue-500" : "text-red-600")}>
            {targetData.result === "W" ? "VICTOIRE" : "DÉFAITE"}
        </h3>

        <ul className="flex-1 flex flex-col items-end ">
            {teams.ennemiesSide.map(player => (
                <li key={player.name} className="text-xl flex gap-4 cursor-pointer" 
                onClick={() => navigate("/stats/" + player.name.toLowerCase())}>
                    <div className="w-[1lh] h-[1lh] rounded-full overflow-hidden">
                        <img src={getClassData(player.match.classPlayed).image} className="w-full h-full object-cover" />
                    </div>
                    <p className="min-w-[120px] text-end">{player.name}</p>
                </li>
            ))}
        </ul>
    </div>

    )
}
