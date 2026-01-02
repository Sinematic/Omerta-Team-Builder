import { useEffect, useState } from "react"
import snakePickOrder from "@/data/snake-pick-order.json"
import PlayerCard from "../UI/PlayerCard";
import playersData from "@/data/players.json"

type PickerProps = {
    players: string[];
    captainsAmount: number;
    teamsHandler: (array: string[][]) => void;
    phaseHandler: () => void;
}

export default function Picker({ players, captainsAmount, teamsHandler, phaseHandler }: PickerProps) {

    const captains = players.slice(0, captainsAmount)

    const [freePlayers, setFreePlayers] = useState<string[]>(players.slice(captainsAmount))
    const [teams, setTeams] = useState<string[][]>([])
    const [pickIndex, setPickIndex] = useState<number>(0)

   const pickOrder = snakePickOrder[captainsAmount.toString() as "2" | "3" | "4"]?.[Number(players) % 4 === 0 ? '4' : '5']

    useEffect(() => {
        const initialTeams = Array.from(
            { length: captainsAmount },
            (_, i) => [captains[i]]
        )
        setTeams(initialTeams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [players, captainsAmount])

    useEffect(() => {
        if(freePlayers.length === 0) {
            teamsHandler(teams)
            phaseHandler()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [freePlayers])

    const addToTeam = (player: string) => {
        const currentTeamIndex = pickOrder
            ? pickOrder[pickIndex]
            : pickIndex % captainsAmount

        setTeams(prev => {
            const newTeams = prev.map(team => [...team])
            newTeams[currentTeamIndex].push(player)
            return newTeams
        });

        setFreePlayers(prev => prev.filter(p => p !== player))
        setPickIndex(prev => prev + 1)
    }

    if(freePlayers.length === 1) addToTeam(freePlayers[0])
        
    
    return (
        <div className="p-6 space-y-6 w-2/3 mx-auto text-center select-none">

            <div className="free-players w-2/3 mx-auto">
                <h2 className="text-xl font-medium mb-4 text-white">
                    Joueurs sans équipe
                </h2>

                <ul className="p-3 rounded-lg mx-auto  ">
                    {freePlayers.map(playerName => {
                        const playerInfo = playersData.find(p => p.name === playerName)
                        if (!playerInfo) return null

                        return <PlayerCard key={playerName} playerInfo={playerInfo} action={() => addToTeam(playerName)} minified={true} />
                    })}

                </ul>                 

            </div>

            <div className="player-in-teams">
                <h2 className="text-xl font-semibold mb-2 text-white">Équipes</h2>

                <div className={`grid-cols-${captainsAmount} grid gap-4 ${captainsAmount === 2 ? "w-1/2" : ""} mx-auto`}>
                    {teams.map((team, i) => (
                        <div key={i} className="bg-stone-700 p-3 rounded text-white">
                            <h3 className="font-bold mb-2">
                                💀 Capitaine : {team[0]}
                            </h3>

                            <ul className="space-y-1">
                                {team.slice(1).map(member => (
                                    <li key={member} className="bg-stone-600 p-2 rounded">
                                        {member}
                                    </li>
                                ))}
                            </ul>

                            {pickOrder[pickIndex] === i && freePlayers.length > 0 && (
                                <p className="mt-2 text-sm text-emerald-300 animate-pulse">
                                    ➤ Tour de pick en cours
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
