import { useEffect, useState } from "react"
import snakePickOrder from "@/data/snake-pick-order.json"

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

    return (
        <div className="p-6 space-y-6 w-1/2 mx-auto text-center">

            <div className="free-players">
                <h2 className="text-xl font-semibold mb-8 text-white">Joueurs sans équipe</h2>

                <ul className="bg-gray-800 text-white p-3 rounded-lg space-y-1 w-2/5 mx-auto select-none">
                    {freePlayers.map(player => (
                        <li key={player} onClick={() => addToTeam(player)} className="p-2 cursor-pointer hover:bg-gray-700 rounded transition">
                            {player}
                        </li>

                    ))}

                </ul>                 

            </div>


            <div className="player-in-teams">
                <h2 className="text-xl font-semibold mb-2 text-white">Équipes</h2>

                <div className="grid grid-cols-2 gap-4">
                    {teams.map((team, i) => (
                        <div key={i} className="bg-gray-700 p-3 rounded text-white">
                            <h3 className="font-bold mb-2">
                                🏅 Capitaine : {team[0]}
                            </h3>

                            <ul className="space-y-1">
                                {team.slice(1).map(member => (
                                    <li key={member} className="bg-gray-600 p-2 rounded">
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
