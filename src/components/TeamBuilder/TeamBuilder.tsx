import { useEffect, useState } from "react"
import playersData from "@/data/players.json"
import SelectPlayers from "@/components/TeamBuilder/SelectPlayers"
import MapLister from "@/components/Maps/MapLister"
import Picker from "@/components/TeamBuilder/Picker"
import Summary from "@/components/Summary"
import Button from "../UI/Button"


export default function TeamBuilder() {

    const players = playersData

    const [playersParticipating, setPlayersParticipating] = useState<string[]>([]) 
    const [phase, setPhase] = useState<number>(0)
    const [format, setFormat] = useState<"captains" | "random">()
    const [teams, setTeams] = useState<string[][]>([])
    const [mapUsed, setMapUsed] = useState({name: "", image: ""})

    const messagePhase =() => {
        if(phase === 0) return "Sélection des joueurs en cours . . ."
        if(phase === 1) return "Sélection du format de composition d'équipes . . ."
        if(phase === 2) return "Sélection des joueurs par les capitaines . . ."
        if(phase === 3) return "Sélection de la carte . . ."
    }

/** Phases
 * 0 Initialisation, inscription des joueurs
 * 1 Sélection du format (Capitaines / Random) 
 * 2 Sélection des équipiers par les capitaines (si Random, passer à 3)
 * 3 Sélection de la carte
 * 4 Résumé
 */

    const handleProceedPhases = () : void => {

        if(!isValidAmountOfPlayers) return 

        if(phase === 0) {
            setPlayersParticipating(shuffleArray(playersParticipating))
            setPhase(1)
            return
        }
            
        if(phase === 1) {
            if(format === "captains") { 
                setPhase(2)
                return
            } else {   
                const numberOfTeams = countCaptains()
                const teamsAssigned: string[][] = Array.from({ length: numberOfTeams }, () => []);

                playersParticipating.forEach((participant, index) => {
                    teamsAssigned[index % numberOfTeams].push(participant)
                });
                setTeams(teamsAssigned)
                setPhase(3)
            }
            return
        }
        if(phase === 2) setPhase(3)
        if(phase === 3) setPhase(4)
    }

    const shuffleArray = (array:string[]): string[] => [...array].sort(() => Math.random() - 0.5) 

    const countCaptains = () => (playersParticipating.length % 5 === 0) 
        ? playersParticipating.length / 5 
        : playersParticipating.length / 4

    const handleClickOnParticipants = (player: string) : void => {

        setPlayersParticipating(prev => {
            if (!prev.includes(player)) return [...prev, player]
            return [...prev.filter(item => item !== player)]
        })
    }

    const handleMapClick = (name:string, image: string) : void => {
        setMapUsed({ name, image})
        setPhase(4)
    }

    const handleTeams = (teamsAssigned: string[][]) => setTeams(teamsAssigned)

    const isValidAmountOfPlayers = () : boolean => playersParticipating.length > 5 && (playersParticipating.length % 4 === 0 || playersParticipating.length % 5 === 0)

    useEffect(() => { 
        if(format) handleProceedPhases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [format])


    return (
        <div className="flex justify-center flex-col">

            <p className="px-4 pt-7 text-center -translate-x-96 italic text-white animate-pulse text-lg">{messagePhase()}</p>

            { phase === 0 ? 
                <SelectPlayers participants={playersParticipating} handleClickOnParticipants={handleClickOnParticipants} players={players} /> 
            : null}

            {phase === 1 ?
                <div className="mx-auto w-1/3 flex flex-cols justify-center gap-8 mt-24">
                    <Button text="Capitaines" action={() => setFormat("captains")} />
                    <Button text="Aléatoire" action={() => setFormat("random")} />
                </div>
            : null}

            {phase === 2 ? <Picker players={playersParticipating} captainsAmount={countCaptains()} teamsHandler={handleTeams} phaseHandler={handleProceedPhases} /> : null}

            {phase === 3 ? <MapLister mapSelecter={handleMapClick} randomMapButton={true} /> : null }

            {isValidAmountOfPlayers() && phase === 0 ? 
                <div className="flex justify-center gap-4 fixed bottom-4 text-white left-1/2 -translate-x-1/2 select-none font-medium ">
                    <Button text="Suivant" action={handleProceedPhases} />
                </div>
            : null }
                
            {phase === 4 ? <Summary map={mapUsed} teams={teams} /> : null}

        </div>)
}
