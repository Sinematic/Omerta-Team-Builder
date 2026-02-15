import clsx from "clsx"
import type { LadderType } from "./LadderPage"
import type { PlayerLadderDataType } from "@/hooks/useLadderData"


export default function LadderElement({ player, ladderType } : { player: PlayerLadderDataType, ladderType: LadderType }) {

    const tearDrop = 
        <svg viewBox="0 0 31 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.5452 17.1856C25.5452 22.5512 20.9704 26.9008 15.327 26.9008C9.68371 26.9008 5.10889 22.5512 5.10889 17.1856H25.5452Z" fill="#880D07"/>
            <path d="M21.5199 10.7088C24.2447 12.8285 25.5452 14.5669 25.5452 17.1856H5.10889C5.10889 12.7107 8.41178 10.0219 10.0632 9.23683C9.56781 12.2986 10.6825 13.6529 11.3017 13.9473C9.81544 6.17506 15.2238 2.66187 18.1138 1.8768C18.1138 3.93761 18.795 8.58915 21.5199 10.7088Z" fill="#880D07"/>
        </svg>

    const PERCEPTOR_ICONS = {
        red: "/images/icons/perceptor-icon-red.png",
        golden: "/images/icons/perceptor-icon-golden.png",
        muted: "/images/icons/perceptor-icon-muted.png",
    } as const

    const gridWdith = {
        "Ladder Classique":  "grid-cols-[55px_80px_124px_60px_1fr_1fr]",
        "Ladder Focus": "grid-cols-[65px_120px_0.8fr_1.4fr_1fr]"
    }

    const lineThrough = (ladderType === "Ladder Focus" && player.perc) ? "line-through" : ""


    return (
        <>
         <li className={clsx(gridWdith[ladderType],
            "w-[465px] h-full relative grid items-center font-semibold border-b border-solid border-[rgb(var(--lightest-gray))] text-sm pl-2 pr-3 text-white",
            player.rank as number <= 3 ? "bg-[#121212]" : "bg-[#212121]/50"
        )}>
            <p className={clsx("font-bold text-lg flex-shrink-0 text-left",
                player.rank === 1 ? "text-[#FFAA11]" : "", 
                player.rank === 2 ? "text-[#7A7A7A]" : "", 
                player.rank === 3 ? "text-[#754200]" : ""
            )}>
                {player.rank as number > 9 ? player.rank  as number : ("0" + (player.rank))}
            </p>

            <p className="flex-shrink-0">{player.name}</p>

            <p className={clsx("flex align-middle flex-shrink-0 pl-4", ladderType === "Ladder Focus" ? "justify-center" : "")}>

                {ladderType === "Ladder Classique" ? 
                    Array.from({ length: 4 }).map((_, i) => {
                    const percCount = Number(player.perc ?? 0)

                    let icon: keyof typeof PERCEPTOR_ICONS | typeof PERCEPTOR_ICONS[keyof typeof PERCEPTOR_ICONS] = PERCEPTOR_ICONS.muted

                    if (i < percCount) {
                        icon = PERCEPTOR_ICONS.red
                    } else if (player.extraPerc && i === percCount) {
                        icon = PERCEPTOR_ICONS.golden
                    }

                    return (
                        <span key={i} className="p-0.5">
                            <img src={icon} alt="Percepteur" />
                        </span>
                    )
                })


                : player.perc &&
                    <span className="p-0.5 max-w-[26px]">
                        <img src={PERCEPTOR_ICONS.golden} alt="Percepteur obtenu via le Ladder Focus" />
                    </span>
                }

            </p>
            
            {ladderType === "Ladder Classique" && <p className="flex justify-center"><span className="w-[16px] h-[16px]">{tearDrop}</span></p> }
            {ladderType === "Ladder Classique" && <p>{player.score}</p>}

            {ladderType === "Ladder Focus" && <p className="text-center">{player.score}</p>}

            <p className={clsx( "text-end", lineThrough )}>
                {new Intl.NumberFormat("fr-FR").format(player.share)}
            </p>

        </li>

</>
    )
}
