import { useStats } from "@/hooks/useStats"
import { useParams } from "react-router"
import playersData from "@/data/players.json"
import NotFound from "../UI/NotFound"
import GameCard from "./GameCard"


type PlayerInfoType = [ string, ...string[] ]

type Match = ({
    result: string;
    side: string;
    classPlayed: string;
    points: number;
    details: string[];
} | null)

export type PlayerDataType = {
    name: string;
    matches : Match[];
}

export type MatchDataType = {
    index: number;
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

    const { data, isLoading } = useStats("Matchs", "A2:K33")

    if (!data) return

    const parseMatch = (rawMatch: string) : Match => {

        if (typeof rawMatch !== "string") return null
        const [ side, result, classPlayed,points, details] = rawMatch.split("-")
        return { side, result, classPlayed, points: Number(points), details: details ? details.split('') : [] }     
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

        <div>
            {playerFound ? 
                <div className="grid place-items-center max-w-5/11 mx-auto m-12 px-12 py-16 text-white text-center gap-8 bg-gray-700 relative rounded-lg">
                    <h1 className="text-2xl font-semibold mb-6 absolute top-4 right-8">
                        {(["a", "e", "i", "o", "u", "y"].includes(pseudoInGame[0].toLowerCase())
                        ? "Historique d'" : "Historique de ") + pseudoInGame}</h1>
                    {isLoading && <h2>Chargement...</h2>} 
                    {matchesPlayedByPlayer.length 
                    ? matchesToDisplay.map(match => <GameCard matchData={match} pseudo={pseudoInGame} key={match.index} />) 
                    : <h2 className="text-xl p-4">Aucune partie trouvée !</h2>}
                    
                </div>
            : <NotFound message={"Joueur introuvable !"} />}
        </div>

    )
}
