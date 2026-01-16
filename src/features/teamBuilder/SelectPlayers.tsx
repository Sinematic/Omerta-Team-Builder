import { sortPlayersByName } from "@/utils/players"
//import { useState } from "react"

type SelectPlayersProps = {
    participants: string[]
    action: (player: string) => void
    players: { name: string, classes: string[] }[]
    message?: string
}

export default function SelectPlayers({ participants, action, players, message } : SelectPlayersProps) {

    const sortedPlayers = sortPlayersByName(players)

    const defaultMessage = ((length: number) => {
        if (length === 0) return "Aucun joueur n'a été sélectionné";
        if (length === 1) return "1 joueur a été sélectionné";
        return length + " joueurs ont été sélectionnés";
    })

    //const [query, setQuery] = useState<string>("")


    return (<>
        <h2 className="select-none text-center text-white py-4 md:py-8">{message ? message : defaultMessage(participants.length)}</h2>
        <ul className="grid grid-cols-3 gap-1 max-w-xl mx-auto select-none
        md:grid-cols-4 md:gap-2">
            {sortedPlayers.map((player) => 
                <li className={`py-2 md:px-4 md:py-2 text-center whitespace-nowrap cursor-pointer ${participants.includes(player.name) ? " bg-amber-700 text-white" : "bg-stone-600 text-white"}`} 
                key={player.name} onClick={() => action(player.name)}>
                    {player.name}
                </li> 
            )}
        </ul>
    </>)
}
