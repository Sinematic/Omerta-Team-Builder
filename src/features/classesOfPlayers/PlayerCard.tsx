import { type DofusClasses, type Player } from "@/types/dofus"
import classesData from "@/data/classes.json"
import { isSmallScreen } from "@/utils/players"
import clsx from "clsx"

type PlayerCardProps = {
    playerInfo : Player
    action ?: () => void
    minified?: boolean
}


export default function PlayerCard({ playerInfo, action, minified=false } : PlayerCardProps) {

    const classesInfo : DofusClasses = classesData

    const smallScreen = isSmallScreen()
    const isMinified = minified || smallScreen


    return (

        <li onClick={action} className={clsx(
            isMinified ? "py-1 mb-2 cursor-pointer hover:bg-[rgb(var(--warning))]" : "py-2",
            "bg-[rgb(var(--bg-lighter))] text-[rgb(var(--text))] flex items-center px-2 gap-2 rounded-lg shadow-sm hover:shadow-md transition-shadow md:gap-4 md:px-4"
        )}>

            <span className={isMinified ? "text-medium text-right" : "text-lg font-semibold md:min-w-[90px]"}>{playerInfo.name}</span>

            <div className={clsx(
                "sm:gap-1 flex flex-wrap",
                isMinified ? "gap-2" : "gap-4")
            }>
                {playerInfo.classes.map((cls) => (
                    <span key={cls} className={clsx(
                        isMinified ? "text-sm" : "bg-[rgb(var(--bg))] text-[rgb(var(--text))] px-3 text-medium",
                        "flex items-center gap-1 py-1 rounded-full font-medium leading-none"
                    )}>
                        <span className={isMinified ? "hidden" : ""}>{classesInfo[cls].emoji}</span>
                        <span className={"inline sm:hidden"}>{classesInfo[cls].short}</span>
                        <span className={"hidden md:inline"}>{classesInfo[cls].name}</span>
                    </span>
                ))}
            </div>
        </li>
    )
}