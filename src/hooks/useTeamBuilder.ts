import { useState, useMemo } from "react"

export type PhaseName = "registration" | "format selection" | "team allocation" | "map selection" | "summary"

export function useTeamBuilder() {
    const [phase, setPhase] = useState<PhaseName>("registration")
    const [playersParticipating, setPlayersParticipating] = useState<string[]>([])
    const [format, setFormat] = useState<"captains" | "random">()
    const [teams, setTeams] = useState<string[][]>([])
    const [mapUsed, setMapUsed] = useState({ name: "", image: "" })

    const togglePlayer = (player: string) => {
        setPlayersParticipating(prev =>
            prev.includes(player) ? prev.filter(p => p !== player) : [...prev, player]
        )
    }

    const chooseFormat = (chosenFormat: "captains" | "random") => {
        setFormat(chosenFormat)

        if (chosenFormat === "random") {
            const numberOfTeams = countCaptains(playersParticipating)
            const teamsAssigned: string[][] = Array.from({ length: numberOfTeams }, () => [])

            playersParticipating.forEach((p, i) => {
                teamsAssigned[i % numberOfTeams].push(p)
            })

            setTeams(teamsAssigned)
            setPhase("map selection")
        } else {
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

    const selectMap = (name: string, image: string) => {
        setMapUsed({ name, image })
        setPhase("summary")
    }

    const messagePhase = useMemo(() => {
        switch (phase) {
        case "registration": return "Sélection des joueurs en cours ..."
        case "format selection": return "Sélection du format de composition d'équipes ..."
        case "team allocation": return "Sélection des joueurs par les capitaines ..."
        case "map selection": return "Sélection de la carte ..."
        default: return ""
        }
    }, [phase])

    const isValidAmountOfPlayers = useMemo(
        () => playersParticipating.length > 5 && 
            (playersParticipating.length % 4 === 0 || playersParticipating.length % 5 === 0),
        [playersParticipating]
    )

    return {
        phase,
        playersParticipating,
        format,
        teams,
        mapUsed,
        togglePlayer,
        chooseFormat,
        nextPhase,
        selectMap,
        messagePhase,
        isValidAmountOfPlayers
    }
}

const shuffleArray = (array: string[]) => [...array].sort(() => Math.random() - 0.5)

const countCaptains = (players: string[]) =>
    players.length % 5 === 0 ? players.length / 5 : players.length / 4
