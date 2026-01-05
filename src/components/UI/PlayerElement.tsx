import classesData from "@/data/classes.json"
import type { ParticipantType } from "../Stats/PlayerHistory";
import { useNavigate } from "react-router";


type ClassInDofusType = keyof typeof classesData


export default function PlayerElement({ player, target, reverse } : { player : ParticipantType, target : boolean, reverse ?: boolean }) {

    const navigate = useNavigate()
    const getClassData = (classInDofus: ClassInDofusType) => classesData[classInDofus]

    return (
        <li role="button" key={player.name} className={"text-xl flex gap-4 cursor-pointer" 
        + (reverse ? " flex-row-reverse" : "")}
        onClick={() => navigate("/stats/" + player.name.toLowerCase())}>

            <p className={"min-w-[120px] text-center " 
            + (target ? " font-semibold " : "")
                }>{player.name}</p>
            
            <div className="w-[1lh] h-[1lh] rounded-full overflow-hidden">
                <img src={getClassData(player.match!.classPlayed as ClassInDofusType).image} alt={"La classe " + player.match!.classPlayed}
                className="w-full h-full object-cover" />
            </div>
            <p>{player.match?.details}</p>
        </li>
    )
}
