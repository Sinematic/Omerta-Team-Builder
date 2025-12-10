import { useEffect, useState } from "react"
import playersData from "../data/players.json"
import SelectPlayers from "./SelectPlayers"
import MapLister from "./MapLister"
import Picker from "./Picker"
import Summary from "./Summary"

export default function TeamBuilder() {

    const players = playersData 

    const [playersParticipating, setPlayersParticipating] = useState<string[]>([]) 
    const [phase, setPhase] = useState<number>(0)
    const [useCaptains, setUseCaptains] = useState(true)
    const [teams, setTeams] = useState<string[][]>([])
    const [mapUsed, setMapUsed] = useState({name: "", image: ""})

    const handleClickOnParticipants = (player: string) : void => {

            setPlayersParticipating(prev => {
            if (!prev.includes(player)) return [...prev, player]
            return [...prev.filter(item => item !== player)]
        })
    }

    const messagePhase =() => {
        if(phase === 0) return "Sélection des joueurs en cours . . ."
        if(phase === 1) return "Sélection du format de composition d'équipes . . ."
        if(phase === 2) return "Sélection des joueurs par les capitaines . . ."
        if(phase === 3) return "Sélection de la carte . . ."
    }

    const handleProceedPhases = () : void => {
        console.log(phase)
        if(!isValidAmountOfPlayers) return 
        if(phase === 0) setPhase(1)
        if(phase === 1) {
            if(useCaptains === true) setPhase(2) 
            else setPhase(3)
            return
        }
        if(phase === 2) setPhase(3)
        if(phase === 3) setPhase(4)
    }

    const countCaptains = () => (playersParticipating.length % 5 === 0) 
        ? playersParticipating.length / 5 
        : playersParticipating.length / 4


    const returnPreviousPhases = () : void => {
        if(phase > 0) setPhase(prev => prev -1)
    }

    const handleSelectFormat = (event) : void => {
        setUseCaptains(event.target.value)
    }

    const handleMapClick = (name:string, image: string) : void => {
        if(mapUsed.name !== name)
        setMapUsed({ name, image})
        setPhase(4)
    }

    const handleTeams = (teamsAssigned: string[][]) => setTeams(teamsAssigned)

    const isValidAmountOfPlayers = () : boolean => playersParticipating.length > 5 && (playersParticipating.length % 4 === 0 || playersParticipating.length % 5 === 0)

    return (
        <div className="flex justify-center flex-col">

            <p className="px-4 pt-7 text-center -translate-x-96 italic text-yellow-400 animate-pulse">{messagePhase()}</p>

            { phase === 0 ? 
                <SelectPlayers participants={playersParticipating} handleClickOnParticipants={handleClickOnParticipants} players={players} /> 
            : null}

            {phase === 1 ?
                <select className="mt-24 max-w-sm px-4 py-3 mx-auto bg-white rounded-lg shadow-sm transition" onChange={() => handleSelectFormat(event)}>
                    <option value="true">Capitaines</option>
                    <option value="false">Aléatoire</option>
                </select>
            : null}

            {phase === 2 ? <Picker players={playersParticipating} captainsAmount={countCaptains()} teamsHandler={handleTeams} phaseHandler={handleProceedPhases} /> : null}

            {phase === 3 ? <MapLister mapSelecter={handleMapClick}/> : null }


            {isValidAmountOfPlayers() && phase < 2 ? 
                <div className="flex justify-center gap-4 fixed bottom-6 text-white left-1/2 -translate-x-1/2 select-none font-medium ">
                    <button onClick={returnPreviousPhases} className="cursor-pointer transition text-5xl">
                        ⬅️
                    </button>
                    <button onClick={handleProceedPhases} className="cursor-pointer transition text-5xl">
                        ➡️
                    </button>             
                </div>
            : null }

                
            {phase === 4 ? <Summary map={mapUsed} teams={teams} /> : null}

        </div>)
}
