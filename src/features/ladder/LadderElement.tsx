import clsx from "clsx"
import type { LadderType } from "./LadderPage"
import type { PlayerLadderDataType } from "@/hooks/useLadderData"


export default function LadderElement({ player, ladderType } : { player: PlayerLadderDataType, ladderType: LadderType }) {

    const tearDrop = 
        <svg viewBox="0 0 31 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.5452 17.1856C25.5452 22.5512 20.9704 26.9008 15.327 26.9008C9.68371 26.9008 5.10889 22.5512 5.10889 17.1856H25.5452Z" fill="#880D07"/>
            <path d="M21.5199 10.7088C24.2447 12.8285 25.5452 14.5669 25.5452 17.1856H5.10889C5.10889 12.7107 8.41178 10.0219 10.0632 9.23683C9.56781 12.2986 10.6825 13.6529 11.3017 13.9473C9.81544 6.17506 15.2238 2.66187 18.1138 1.8768C18.1138 3.93761 18.795 8.58915 21.5199 10.7088Z" fill="#880D07"/>
        </svg>

    const percIcon = 
        <svg viewBox="80 0 36 38" className="h-full w-full block" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M86.5895 31.3729C87.2229 31.9231 86.7959 32.3401 86.4421 32.5482C86.0001 32.8313 85.5432 33.1134 85.1012 33.4114C83.7893 34.2446 87.8281 38.7678 89.2431 37.8755C90.3335 37.1913 91.4098 36.5071 92.5002 35.822C93.0604 35.539 93.3551 35.3009 92.5884 34.0366C88.4906 27.2817 85.8228 18.2204 91.9841 11.7918C96.1111 7.46172 103.142 7.46172 107.284 11.7918C113.431 18.2195 110.763 27.2809 106.68 34.0366C105.913 35.3009 106.194 35.5399 106.754 35.822C107.844 36.5062 108.936 37.1904 110.011 37.8755C111.426 38.7687 115.48 34.2446 114.153 33.4114C113.711 33.1134 113.269 32.8313 112.812 32.5482C112.458 32.3401 112.03 31.9231 112.665 31.3729C119.415 24.4391 118.634 9.67923 111.057 3.63773C104.984 -1.21257 94.269 -1.21257 88.1959 3.63773C80.6196 9.67835 79.8388 24.4391 86.5895 31.3729ZM113.519 24.8112C112.944 24.8112 112.472 24.3501 112.472 23.7699C112.472 23.1897 112.944 22.7136 113.519 22.7136C114.093 22.7136 114.565 23.1897 114.565 23.7699C114.565 24.3501 114.093 24.8112 113.519 24.8112Z"
            fill="currentColor"/>
        </svg>

    const gridWdith = {
        "Ladder Classique":  "grid-cols-[55px_80px_104px_80px_1fr_1fr]",
        "Ladder Focus": "grid-cols-[65px_120px_0.8fr_1.4fr_1fr]"
    }

    const lineThrough = (ladderType === "Ladder Focus" && player.perc) ? "line-through" : ""

    const colors = {
        golden: "#C89423",
        red: "#AF211A",
        muted: "#535252"
    }


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

            <p className="flex-shrink-0">{player.name === "Fumeuzedefrap" ? "Fumeur" : player.name }</p>

            <p className={clsx("flex align-middle flex-shrink-0", ladderType === "Ladder Focus" ? "justify-center" : "")}>

                {ladderType === "Ladder Classique" ? 
                    Array.from({ length: 4 }).map((_, i) => {
                        const percCount = Number(player.perc ?? 0)
                        let color = colors.muted

                        if (i < percCount) color = colors.red
                        else if (player.extraPerc && i === percCount) color = colors.golden

                        return (
                            <span key={i} style={{ color }} className="h-[20px] w-[26px] flex-shrink-0 flex items-center">
                                {percIcon}
                            </span>
                        )
                    })

                : player.perc &&
                    <span style={{ color: colors.golden }} className={clsx(
                        "h-[20px] w-[26px] flex-shrink-0 flex",
                        ladderType === "Ladder Focus" ? "items-center" : ""
                    )}>
                        {percIcon}
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
