import { useParams } from "react-router"
import playersData from "@/data/players.json"
import NotFound from "@/components/UI/NotFound"
import GameCard from "@/features/stats/GameCard"
import { type Match } from "@/types/dofus"
import { parseMatch } from "@/utils/players"
import { type PlayerInfoType } from "@/types/dofus"
import Loader from "@/components/UI/Loader"
import { useStats } from "@/hooks/useStats"
import { useSeasons } from "@/hooks/useSeasons"
//import { usePlayerHistory } from "@/hooks/usePlayerHistory"
// /!\

export type PlayerDataType = { name: string; matches : Match[] }

export type MatchDataType = { index: number; participants: ParticipantType[] }

export type ParticipantType = { name: string; match: Match }

export type PlayerData = { name: string; matches: Match[] }


export default function PlayerHistory() {

    const seasons = useSeasons()

    const { pseudo } = useParams<{ pseudo: string }>()

    const pseudoInGame = pseudo ? pseudo.split("-")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join("-")
    : ""

    const { data, isLoading } = useStats("Matchs", "A2:Z33")

    const playersList = playersData
    const playerFound = playersList.some(player => player.name.toLowerCase() === pseudo)
    
    //const mergedData = usePlayerHistory()

    //console.log(mergedData)

    if(!playerFound) return <NotFound message="Joueur introuvable !" />
    if(isLoading) return <Loader message={"Chargement des données du joueur " + pseudo} />
    if(!data) return <NotFound message="Données introuvables !" />


    const mergeSeasons = (pastSeasons: PlayerInfoType[][], currentSeason: PlayerInfoType[]): PlayerInfoType[] => {

        const playerMap: Record<string, (string | null)[]> = {}

        pastSeasons?.forEach(season => {
            season.forEach(([name, ...matches]) => {
                if (!playerMap[name]) playerMap[name] = [name]
                playerMap[name].push(...matches)
            })
        })

        currentSeason.forEach(([name, ...matches]) => {
            if (!playerMap[name]) playerMap[name] = [name]
            playerMap[name].push(...matches)
        })

        return Object.values(playerMap).filter((row): row is PlayerInfoType => typeof row[0] === "string")
    }

    let usableData

    if(seasons?.seasons) {
        const pastSeasons: PlayerInfoType[][] = seasons.seasons.map((season) => season.data as PlayerInfoType[])  
        usableData = mergeSeasons(pastSeasons, data)
    }

    if(!usableData) usableData = data

    
    const players: PlayerDataType[] = (data as PlayerInfoType[]).map(([name, ...rawMatches] : PlayerInfoType) => ({
        name,
        matches: rawMatches.map(match => parseMatch(match))
    }))

    const playerHistory = players.find(player => player.name === pseudoInGame) 

    const indexOfGamesPlayed : number[] = playerHistory?.matches
        .map((match, index) => match !== null ? index : -1)
        .filter(index => index !== -1) ?? []

    const matchesPlayedByPlayer : MatchDataType[] = indexOfGamesPlayed.map(index => {

        const participants = players
            .map(player => ({
                name: player.name,
                match: player.matches[index]
            }))
            .filter(
                (p): p is { name: string; match: Match } =>
                p.match !== null && p.match !== undefined
            )
            
        participants.sort((a, b) => {
            if (a.name === pseudoInGame) return -1
            if (b.name === pseudoInGame) return 1
            return 0
        })

        return { index, participants }
        
    })

    const matchesToDisplay = [...matchesPlayedByPlayer].reverse()


    return (
        <div className="grid place-items-center w-full mx-auto px-6 pt-16 pb-[70px] bg-[rgb(var(--bg))]
        text-[rgb(var(--text))] text-center gap-8 relative rounded-lg md:max-w-[800px] md:py-16 md:px-12">
            
            <h1 className="text-2xl font-semibold mb-6 absolute top-4 right-8">
                {(["a", "e", "i", "o", "u", "y"].includes(pseudoInGame[0].toLowerCase())
                ? "Historique d'" : "Historique de ") + pseudoInGame}
            </h1>

            {matchesPlayedByPlayer.length 
                ? matchesToDisplay.map(match => <GameCard matchData={match} pseudo={pseudoInGame} key={match.index} />) 
                : <h2 className="text-xl p-4">Aucune partie trouvée !</h2>
            }
            
        </div>
    )
}
