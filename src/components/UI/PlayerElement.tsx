import classesData from "@/data/classes.json"
import type { ParticipantType } from "@/features/stats/PlayerHistory"
import { useNavigate } from "react-router"


type ClassInDofusType = keyof typeof classesData


export default function PlayerElement({ player, target, reverse } : { player : ParticipantType, target : boolean, reverse ?: boolean }) {

    const navigate = useNavigate()
    const getClassData = (classInDofus: ClassInDofusType) => classesData[classInDofus]


    return (

        <li role="button" key={player.name} onClick={() => navigate("/stats/" + player.name.toLowerCase())}
        className={"text-lg flex gap-2 cursor-pointer" + (reverse ? " flex-row-reverse" : "")}>
            <p className={"min-w-[120px] text-center " 
            + (target ? " font-semibold " : "")}>
                {player.name}
            </p>
            
            <div className="w-[1lh] h-[1lh] rounded-full overflow-hidden">
                <img src={getClassData(player.match!.classPlayed as ClassInDofusType).image} alt={"La classe " + player.match!.classPlayed}
                className="w-full h-full object-cover" />
            </div>
            
            <p className="inline-block align-text-bottom text-xl">{player.match?.details}</p>

        </li>
    )
}
