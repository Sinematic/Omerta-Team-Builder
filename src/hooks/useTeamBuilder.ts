import { shuffleArray } from "@/utils/players"
import { useState, useMemo } from "react"


export type PhaseName = "registration" | "format selection" | "team allocation" | "map selection" | "summary"

export type UseTeamBuilderReturn = {
    phase: PhaseName
    playersParticipating: string[]
    format?: "captains" | "random"
    teams: string[][]
    updateTeams: (newTeams: string[][]) => void
    mapUsed: { name: string; image: string }
    togglePlayer: (player: string) => void
    chooseFormat: (format: "captains" | "random") => void
    nextPhase: () => void
    selectMap: (name: string, image: string) => void
    messagePhase: string
    isValidAmountOfPlayers: boolean
    progress: number
}


export function useTeamBuilder() : UseTeamBuilderReturn {
    
    const [phase, setPhase] = useState<PhaseName>("registration")
    const [playersParticipating, setPlayersParticipating] = useState<string[]>([])
    const [format, setFormat] = useState<"captains" | "random">()
    const [teams, setTeams] = useState<string[][]>([])
    const [mapUsed, setMapUsed] = useState({ name: "", image: "" })

    const messagePhase = {
        "registration": "Sélection des joueurs en cours ...",
        "format selection": "Sélection du format...",
        "team allocation": "Sélection des joueurs...",
        "map selection": "Sélection de la carte...",
        "summary": ""
    }[phase]

    const progress = useMemo(() => {
        switch (phase) {
            case "registration": return 5
            case "format selection": return 25
            case "team allocation": return 50
            case "map selection": return 75
            case "summary": return 99
        }
    }, [phase])

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
            playersParticipating.forEach((p, i) => {
            emptyTeams[i % numberOfTeams].push(p)
            })

            setTeams(emptyTeams)
            setPhase("map selection")
        } else {
            setTeams(emptyTeams)
            setPhase("team allocation")
        }
    }

    const nextPhase = () => {
        switch (phase) {
        case "registration":
            setPlayersParticipating(shuffleArray(playersParticipating))
            setPhase("format selection")
            break
        case "team allocation":
            setPhase("map selection")
            break
        case "map selection":
            setPhase("summary")
            break
        }
    }
    // Priorité à la composition d'équipes à 5, si indisponible, composition par 4
    const countCaptains = (players: string[]) => players.length % 5 === 0 ? players.length / 5 : players.length / 4

    const updateTeams = (newTeams: string[][]) => {
        setTeams(newTeams)
    }

    const selectMap = (name: string, image: string) => {
        setMapUsed({ name, image })
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