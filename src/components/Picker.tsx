import { useState } from "react"
import playersData from "../assets/players.json"

export default function Picker() {

    type optionsPickPhase = {
        teams : number;
        captains : boolean
    }

    const players = playersData 

    const [playersParticipating, setPlayersParticipating] = useState<string[]>([]) 
    const [phase, setPhase] = useState<number>(0)

    const [options, setOptions] = useState<optionsPickPhase>({ teams: 2, captains: true})


    const handleClick = (player: string) : void => {
            setPlayersParticipating(prev => {
            if (!prev.includes(player)) return [...prev, player]

            return [...prev.filter(item => item !== player)]
        })
    }

    const message = ((length: number) => {
        if (length === 0) return "Aucun joueur n'a été sélectionné";
        if (length === 1) return "1 joueur a été sélectionné";
        return length + " joueurs ont été sélectionnés";
    })

    const messagePhase =() => {
        if(phase === 0) return "Sélection des joueurs en cours"
        if(phase === 1) return "Sélection du format"
    }

    const handleProceedPhases = () : void => {
        if(phase === 0 && playersParticipating.length === 10) setPhase(1)
    }

    return (
    <>

    <p className="px-4 py-4 text-center -translate-x-2">{messagePhase()}</p>

    { phase === 0 ? <>
        <h2 className="text-center py-8 text-white">{message(playersParticipating.length)}</h2>
        <ul className="grid grid-cols-3 gap-2 max-w-xl mx-auto">
            {players.map((player) => 
                <li className={`px-4 py-2 text-center cursor-pointer ${playersParticipating.includes(player.name) ? " bg-red-200" : "bg-white"}`} 
                key={player.name} onClick={() => handleClick(player.name)}>
                    {player.name}
                </li> 
            )}
        </ul>

    </> : null}

        {playersParticipating.length === 10 ? 
            <button onClick={handleProceedPhases} className={`px-6 py-3 rounded-xl font-semibold transition fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-lg shadow-lg ${phase === 1 ? "bg-red-600 text-white " 
                : "bg-green-600 text-white "}`}>
                {phase === 1 
                    ? "Annuler" 
                    : "Valider"}
            </button>
        : null }


        {playersParticipating.length === 10 ? 
            <button onClick={handleProceedPhases} className={`px-6 py-3 rounded-xl font-semibold transition fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white rounded-lg shadow-lg ${phase === 1 ? "bg-red-600 text-white " 
                : "bg-green-600 text-white "}`}>
                {phase === 1 
                    ? "Annuler" 
                    : "Valider"}
            </button>
        : null }

            {phase === 1 && (
                <select className="mt-4 max-w-sm px-4 py-3 border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                    <option value="random">Composition aléatoire</option>
                    <option value="captains">Composition par capitaines</option>
                </select>
            )}


    </>)
}
