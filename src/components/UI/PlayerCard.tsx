import { type DofusClasses, type Player } from "@/types/dofus"
import classesData from "@/data/classes.json"
import useIsSmallScreen from "../hooks/useIsMobile";

type PlayerCardProps = {
    playerInfo : Player;
    action ?: () => void;
    minified?: boolean;
}


export default function PlayerCard({ playerInfo, action, minified=false } : PlayerCardProps) {

    const classesInfo : DofusClasses = classesData
    const isSmallScreen = useIsSmallScreen()

    if(isSmallScreen) minified = true


    return (

        <li onClick={action} className={(minified ? "py-1 bg-neutral-700 text-white mb-2 cursor-pointer hover:bg-amber-700" : "py-2 bg-white") 
        + " flex items-center px-2 gap-2 rounded-lg shadow-sm hover:shadow-md transition-shadow md:gap-4 md:px-4"}>

            <span className={minified ? "text-medium font-medium text-right" : "text-lg font-semibold min-w-[80px]"}>{playerInfo.name}</span>

            <div className={(isSmallScreen ? "gap-1" : (minified ? "gap-2" : "gap-4")) + " flex flex-wrap"}>
                {playerInfo.classes.map((cls) => (
                    <span key={cls} className={(minified ? "bg-transparent text-stone-400 text-sm" : "bg-gray-100 text-black px-3 text-medium") 
                    + " flex items-center gap-1 py-1 rounded-full font-medium"}>
                        {!isSmallScreen ? <>{classesInfo[cls].emoji} {classesInfo[cls].name}</> 
                        :  <>{classesInfo[cls].short}</>}
                    </span>
                ))}
            </div>
        </li>
    )
}

