import type { DofusClasses, Player } from "@/types/dofus"
import classesData from "@/data/classes.json"


export default function PlayerCard({ playerInfo, action, minified=false } : { playerInfo : Player, action ?: () => void, minified?: boolean }) {

    const classesInfo = classesData as unknown as DofusClasses


    return (

        <li onClick={action} className={(minified ? "py-1 bg-neutral-700 text-white mb-2 cursor-pointer hover:bg-amber-700" : "py-2 bg-white") 
        + " flex flex-wrap items-center gap-4 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"}>

            <span className={minified ? "text-medium font-medium text-right" : "text-lg font-semibold min-w-[80px]"}>{playerInfo.name}</span>

            <div className={(minified ? "gap-2" : "gap-4") + " flex flex-wrap"}>
                {playerInfo.classes.map((cls) => (
                    <span key={cls} className={(minified ? "bg-transparent text-stone-400 text-sm" : "bg-gray-100 text-black px-3 text-medium") 
                    + " flex items-center gap-1 py-1 rounded-full font-medium"}>
                        {classesInfo[cls].emoji} {classesInfo[cls].name}
                    </span>
                ))}
            </div>
        </li>
    )
}

