import { shuffleArray } from "@/utils/players"
import { useState, useMemo  } from "react"


export type PhaseName = "registration" | "format selection" | "team allocation" | "map selection" | "summary"

export type UseTeamBuilderReturn = {
    phase: PhaseName
    playersParticipating: string[]
    format?: "captains" | "random"
    teams: string[][]
    updateTeams: (newTeams: string[][]) => void
    mapUsed: MapType | null
    togglePlayer: (player: string) => void
    chooseFormat: (format: "captains" | "random") => void
    nextPhase: () => void
    selectMap: (map: MapType) => void
    messagePhase: string
    isValidAmountOfPlayers: boolean
    progress: number
}

export type MapType = { 
    name: string
    image: string 
}


export function useTeamBuilder() : UseTeamBuilderReturn {
    
    const [phase, setPhase] = useState<PhaseName>("registration")
    const [playersParticipating, setPlayersParticipating] = useState<string[]>([])
    const [format, setFormat] = useState<"captains" | "random">()
    const [teams, setTeams] = useState<string[][]>([])
    const [mapUsed, setMapUsed] = useState<MapType | null>(null)


    const messagePhase = {
        "registration": "Sélection des joueurs en cours ...",
        "format selection": "Sélection du format...",
        "team allocation": "Sélection des joueurs...",
        "map selection": "Sélection de la carte...",
        "summary": ""
    }[phase]

    const progress = {
        "registration": 5,
        "format selection": 25,
        "team allocation": 50,
        "map selection": 75,
        "summary": 99
    }[phase]

    const togglePlayer = (player: string) => {
        setPlayersParticipating(prev =>
            prev.includes(player) ? prev.filter(p => p !== player) : [...prev, player]
        )
    }

    const chooseFormat = (chosenFormat: "captains" | "random") => {

        setFormat(chosenFormat)

        const numberOfTeams = countCaptains(playersParticipating)
        const emptyTeams: string[][] = Array.from({ length: numberOfTeams }, () => [])

        if (chosenFormat === "random") {
            playersParticipating.forEach((p, i) => { emptyTeams[i % numberOfTeams].push(p) })

            setTeams(emptyTeams)
            setPhase("map selection")
        } else {
            setTeams(emptyTeams)
            setPhase("team allocation")
        }
    }

    const nextPhaseMap: Partial<Record<PhaseName, PhaseName>> = {
        "registration": "format selection",
        "team allocation": "map selection",
        "map selection": "summary",
    }

    const nextPhase = () => {

        if (phase === "registration") setPlayersParticipating(shuffleArray(playersParticipating))
    
        const next = nextPhaseMap[phase]
        if (next) setPhase(next)
        
    }
    // Priorité à la composition d'équipes à 5, si indisponible, composition par 4
    const countCaptains = (players: string[]) => players.length % 5 === 0 ? players.length / 5 : players.length / 4

    const updateTeams = (newTeams: string[][]) => {
        setTeams(newTeams)
    }

    const selectMap = (map : MapType) => {
        setMapUsed(map)
        setPhase("summary")
    }

    const isValidAmountOfPlayers = useMemo(() => 
        playersParticipating.length > 5 && (playersParticipating.length % 4 === 0 || playersParticipating.length % 5 === 0),
        [playersParticipating]
    )

    return {
        phase,
        playersParticipating,
        format,
        teams,
        updateTeams,
        mapUsed,
        togglePlayer,
        chooseFormat,
        nextPhase,
        selectMap,
        messagePhase,
        isValidAmountOfPlayers,
        progress
    }
}