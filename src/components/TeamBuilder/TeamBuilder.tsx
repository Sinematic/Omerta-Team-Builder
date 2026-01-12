import { useEffect, useState } from "react"
import playersData from "@/data/players.json"
import SelectPlayers from "@/components/TeamBuilder/SelectPlayers"
import MapLister from "@/components/Maps/MapLister"
import Picker from "@/components/TeamBuilder/Picker"
import Summary from "@/components/Summary"
import Button from "../UI/Button"

type PhaseName = "registration" | "format selection" | "team allocation" | "map selection" | "summary"


export default function TeamBuilder() {

    const players = playersData

    const phases : { name : PhaseName, message : string }[] = [
        { name : "registration", message: "Sélection des joueurs en cours ..." },
        { name : "format selection", message: "Sélection du format de composition d'équipes ..." },
        { name : "team allocation", message: "Sélection des joueurs par les capitaines ..." },
        { name : "map selection", message: "Sélection de la carte ..." },
        { name : "summary", message: "" }
    ]

    const [playersParticipating, setPlayersParticipating] = useState<string[]>([]) 
    const [phase, setPhase] = useState<PhaseName>(phases[0].name)
    const [format, setFormat] = useState<"captains" | "random">()
    const [teams, setTeams] = useState<string[][]>([])
    const [mapUsed, setMapUsed] = useState({name: "", image: ""})

    const messagePhase = () => phases.find(p => p.name === phase)?.message
/*
    const handlePhases = () : void => {

        if(!isValidAmountOfPlayers) return 

        if(phase === "registration") {
            setPlayersParticipating(prev => shuffleArray(prev))
            setPhase("format selection")
            return
        }
            
        if(phase === "format selection" ) {
            if(format === "captains") { 
                setPhase(phases[2].name)
                return
            } else {   
                const numberOfTeams = countCaptains()
                const teamsAssigned: string[][] = Array.from({ length: numberOfTeams }, () => []);

                playersParticipating.forEach((participant, index) => {
                    teamsAssigned[index % numberOfTeams].push(participant)
                });
                setTeams(teamsAssigned)
                setPhase(phases[3].name)
            }
            return
        }

        if(phase === "team allocation") setPhase(phases[3].name)
        if(phase === "map selection") setPhase(phases[4].name)
    }*/

        const handlePhases = () : void => {

        if(!isValidAmountOfPlayers) return 

        switch(phase) {
            case ("registration") : {
                setPlayersParticipating(prev => shuffleArray(prev))
                setPhase("format selection")
                break
            }
            case ("format selection") : {
                if(format === "captains") { 
                    setPhase(phases[2].name)
                    break
                } else {   
                    const numberOfTeams = countCaptains()
                    const teamsAssigned: string[][] = Array.from({ length: numberOfTeams }, () => []);

                    playersParticipating.forEach((participant, index) => {
                        teamsAssigned[index % numberOfTeams].push(participant)
                    });
                    setTeams(teamsAssigned)
                    setPhase(phases[3].name)
                }
                    break
            }
            
            case ("team allocation") : {
                setPhase(phases[3].name)
                break
            }
            
            case ("map selection") : {
                setPhase(phases[4].name)
                break
            }

        }
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
        setPhase(phases[4].name)
    }

    const handleTeams = (teamsAssigned: string[][]) => setTeams(teamsAssigned)

    const isValidAmountOfPlayers = () : boolean => playersParticipating.length > 5 && (playersParticipating.length % 4 === 0 || playersParticipating.length % 5 === 0)

    useEffect(() => { 
        if(format) handlePhases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [format])


    return (
        <div className="flex justify-center flex-col">

            {phase !== "summary" ? <p className="px-4 pt-7 text-center -translate-x-96 italic text-white animate-pulse text-lg">{messagePhase()}</p> : null}

            { phase === "registration" ? 
                <SelectPlayers participants={playersParticipating} handleClickOnParticipants={handleClickOnParticipants} players={players} /> 
            : null}

            {phase === "format selection" ?
                <div className="mx-auto w-1/3 flex flex-cols justify-center gap-8 mt-24">
                    <Button text="Capitaines" action={() => setFormat("captains")} />
                    <Button text="Aléatoire" action={() => setFormat("random")} />
                </div>
            : null}

            {phase === "team allocation" ? <Picker players={playersParticipating} captainsAmount={countCaptains()} teamsHandler={handleTeams} phaseHandler={handlePhases} /> : null}

            {phase === "map selection" ? <MapLister mapSelecter={handleMapClick} randomMapButton={true} /> : null }

            {isValidAmountOfPlayers() && phase === "registration" ? 
                <div className="flex justify-center gap-4 fixed bottom-8 text-white left-1/2 -translate-x-1/2 select-none font-medium ">
                    <Button text="Suivant" action={handlePhases} />
                </div>
            : null }

            {phase === "summary" ? <Summary map={mapUsed} teams={teams} /> : null}

        </div>)
}
