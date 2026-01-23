import { useEffect, useMemo, useState } from "react"
import SelectPlayers from "@/features/teamBuilder/SelectPlayers"
import MapLister from "@/features/maps/MapLister"
import Picker from "@/features/teamBuilder/Picker"
import Summary from "@/features/teamBuilder/Summary"
import Button from "@/components/UI/Button"
import { getAllPlayers } from "@/utils/players"
import { type Player } from "@/types/dofus"
import Card from "@/components/UI/Card"


type PhaseName = "registration" | "format selection" | "team allocation" | "map selection" | "summary"


export default function TeamBuilder() {


    const players : Player[] = useMemo(() => getAllPlayers(), [])

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

    const handlePhases = () : void => {

        if(!validPlayers) return 

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

    const handleMapClick = (name:string, image: string, newRandomMap ?: boolean) : void => {
        setMapUsed({ name, image})
        if(!newRandomMap) setPhase(phases[4].name)
    }

    const handleTeams = (teamsAssigned: string[][]) => setTeams(teamsAssigned)

    const isValidAmountOfPlayers = () : boolean => playersParticipating.length > 5 && (playersParticipating.length % 4 === 0 || playersParticipating.length % 5 === 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const validPlayers = useMemo(() => isValidAmountOfPlayers(), [playersParticipating])

    useEffect(() => { 
        if(format) handlePhases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [format])


    return (
        <div className="flex justify-center flex-col pb-[70px]">

            { phase !== "summary" ? <p className="px-4 pt-7 text-center -translate-x-96 italic text-[rgb(var(--text))] animate-pulse text-lg">{messagePhase()}</p> : null}

            { phase === "registration" ? 
                <SelectPlayers selected={playersParticipating} action={handleClickOnParticipants} players={players} /> 
            : null}

            { phase === "format selection" ?
                <div className="w-full h-[70vh] md:w-[70vh] md:h-[60vh] flex flex-cols justify-center gap-2 mx-auto p-2 md:mt-16">
                    <Card text="Capitaines" image="/images/goultard.jpg" description="1 capitaine par équipe, sélection des joueurs en semi-snakes" 
                    action={() => setFormat("captains")} animated={true} />
                    <Card text="Aléatoire" image="/images/aventuriers-au-zaap.jpg" description="Composition aléatoire des équipes" 
                    action={() => setFormat("random")} animated={true} />
                </div>
            : null}

            { phase === "team allocation" ? <Picker players={playersParticipating} captainsAmount={countCaptains()} teamsHandler={handleTeams} phaseHandler={handlePhases} /> : null}

            { phase === "map selection" ? <MapLister mapSelecter={handleMapClick} randomMapButton={true} /> : null }

            { validPlayers && phase === "registration" ? 
                <Button text="Suivant" action={handlePhases} specifiedClasses="w-fit mx-auto my-8" />
            : null }

            { phase === "summary" ? <>
                <Summary map={mapUsed} teams={teams} />
            </>
            : null}

        </div>
    )
}
