import { useStats } from "@/hooks/useStats"
import { useParams } from "react-router"
import playersData from "@/data/players.json"
import NotFound from "@/components/UI/NotFound"
import GameCard from "@/features/stats/GameCard"
//import dataSeasonOne from "@/data/season-1-definitive-matches.json"


type PlayerInfoType = [ string, ...string[] ]

type Match = ({
    result: string
    side: string
    classPlayed: string
    points: number
    details: string[]
} | null)

export type PlayerDataType = {
    name: string
    matches : Match[]
}

export type MatchDataType = {
    index: number
    participants: ParticipantType[]
}

export type ParticipantType = { name: string; match: Match }


export default function PlayerHistory() {

    const { pseudo } = useParams<{ pseudo: string }>()

    const pseudoInGame = pseudo ? pseudo.split("-")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join("-")
    : ""

    const playersList = playersData
    const playerFound = playersList.some(player => player.name.toLowerCase() === pseudo)

    const { data, isLoading } = useStats("Matchs", "A2:Z33")

    console.log("voic", data)




    if (!data) return

    const parseMatch = (rawMatch: unknown): Match | null => {
        if (typeof rawMatch !== "string") return null

        const parts = rawMatch.split("-")
        if (parts.length < 4) return null

        const [side, result, classPlayed, points, details] = parts

        if (!side || !result || !classPlayed) return null

        const parsedPoints = Number(points)
        if (!Number.isFinite(parsedPoints)) return null

        return { side, result, classPlayed, points: parsedPoints, details: details ? details.split("") : [] }
    }
    
    const players: PlayerDataType[] = data.map(([name, ...rawMatches] : PlayerInfoType) => ({
        name,
        matches: rawMatches.map(match => parseMatch(match))
    }))

    const playerHistory = players.find(player => player.name === pseudoInGame) 

    const indexOfGamesPlayed : number[] = playerHistory?.matches
        .map((match, index) => match !== null ? index : -1)
        .filter(index => index !== -1) ?? []

    const matchesPlayedByPlayer : MatchDataType[] = indexOfGamesPlayed.map(index => {

        const participants = players
            .filter(player => player.matches[index] !== null)
            .map(player => ({
                name: player.name,
                match: player.matches[index]
            }))

            
        participants.sort((a, b) => {
            if (a.name === pseudoInGame) return -1
            if (b.name === pseudoInGame) return 1
            return 0
        })

        return { index, participants }
        
    })

    const matchesToDisplay = [...matchesPlayedByPlayer].reverse()


    return (
    <>
        {playerFound ? 
            <div className="grid place-items-center w-full mx-auto px-6 pt-16 pb-[70px] bg-[rgb(var(--bg))]
            text-[rgb(var(--text))] text-center gap-8 relative rounded-lg md:max-w-[800px] md:py-16 md:px-12">
                
                <h1 className="text-2xl font-semibold mb-6 absolute top-4 right-8">
                    {(["a", "e", "i", "o", "u", "y"].includes(pseudoInGame[0].toLowerCase())
                    ? "Historique d'" : "Historique de ") + pseudoInGame}
                </h1>

                {isLoading && <h2>Chargement...</h2>} 

                {matchesPlayedByPlayer.length 
                    ? matchesToDisplay.map(match => <GameCard matchData={match} pseudo={pseudoInGame} key={match.index} />) 
                    : <h2 className="text-xl p-4">Aucune partie trouvée !</h2>
                }
                
            </div>

        : <NotFound message={"Joueur introuvable !"} />}
    </>)
}
