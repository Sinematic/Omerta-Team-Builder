import classesData from "@/data/classes.json"
import type { ParticipantType } from "@/features/stats/PlayerHistory"
import clsx from "clsx"
import { useNavigate } from "react-router"


type ClassInDofusType = keyof typeof classesData


export default function PlayerElement({ player, target, reverse } : { player : ParticipantType, target : boolean, reverse ?: boolean }) {

    const navigate = useNavigate()
    const getClassData = (classInDofus: ClassInDofusType) => classesData[classInDofus]
    const details = player.match?.details

    // const mvpEmojis =  [
    //     "\uD83D\uDC51", // 👑 ,
    //     "\ud83e\udd47", // 1st place
    //     "\ud83e\udd48" // 2nd place
    // ]

    //const mvpEmojis = ["👑", "🥇", "🥈"]
    const MVP_EMOJIS = ["👑", "🥇", "🥈"];

    const containsMVPEmoji = (arr: string[]) => Array.from(arr.join("")).find(emoji => MVP_EMOJIS.includes(emoji))

    const mvpEmoji = details ? containsMVPEmoji(details) ?? null : null


    return (

        <li role="button" key={player.name} onClick={() => navigate("/stats/" + player.name.toLowerCase())} className={clsx(
            "text-lg flex gap-2 cursor-pointer relative",
            (reverse ? " flex-row-reverse" : "")
        )}>
            {mvpEmoji && <span title="👑 MVP: +15 / 🥈 MVP du match: +15" className={clsx(
                "absolute top-0",
                !reverse ? "-left-4" : "-right-4"
            )}>{mvpEmoji}</span>}
            
            <p className={"min-w-[120px] text-center " 
            + (target ? " font-semibold " : "")}>
                {player.name}
            </p>
            
            <div className="w-[1lh] h-[1lh] rounded-full overflow-hidden">
                <img src={getClassData(player.match!.classPlayed as ClassInDofusType).image} alt={"La classe " + player.match!.classPlayed}
                className="w-full h-full object-cover" />
            </div>
            
            {details && <p title="🔥 Entraînement remporté: +3 / ⌛ Tour inachevé: -5 / ❌ Erreur: -10" className="inline-block text-sm self-center">
                {mvpEmoji ? details.filter(emoji => emoji === mvpEmoji) : details}
                </p>
            }

        </li>
    )
}
