import classesData from "@/data/classes.json"
import type { ParticipantType } from "@/features/stats/PlayerHistory"
import clsx from "clsx"
import { useNavigate } from "react-router"


type ClassInDofusType = keyof typeof classesData


export default function PlayerElement({ player, target, reverse } : { player : ParticipantType, target : boolean, reverse ?: boolean }) {

    const navigate = useNavigate()
    const getClassData = (classInDofus: ClassInDofusType) => classesData[classInDofus]
    const details = player.match?.details
    const match = player.match!

    const MVP_EMOJIS = ["👑", "🥇", "🥈"];

    const containsMVPEmoji = (arr: string[]) => Array.from(arr.join("")).find(emoji => MVP_EMOJIS.includes(emoji))

    const mvpEmoji = details ? containsMVPEmoji(details) ?? null : null


    return (

        <li role="button" onClick={() => navigate("/stats/" + player.name.toLowerCase())} className={clsx(
            "text-lg flex gap-2 cursor-pointer relative",
            (reverse ? " md:flex-row-reverse" : "")
        )}>
            {mvpEmoji && 
                <span title="👑 MVP: +15 / 🥈 MVP du match: +15"
                className={clsx("absolute", !reverse ? "-left-4" : "-right-4", mvpEmoji === "👑" ? "bottom-0.5" : "")}>
                    {mvpEmoji}
                </span>
            }

            <p className={clsx("min-w-[120px] text-center", target && "font-semibold")}>
                {player.name}
            </p>
            
            <div className="w-[1lh] h-[1lh] rounded-full overflow-hidden">
                <img src={getClassData(match.classPlayed as ClassInDofusType).image} alt={"La classe " + match.classPlayed}
                className="w-full h-full object-cover" />
            </div>
            
            {details && <p title="🔥 Échauffement remporté: +3 / ⌛ Tour inachevé: -5 / ❌ Erreur: -10" className="inline-block text-sm self-center">
                {mvpEmoji ? details.filter(emoji => emoji === mvpEmoji) : details}
                </p>
            }

        </li>
    )
}
