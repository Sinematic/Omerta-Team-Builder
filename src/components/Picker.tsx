import { useEffect, useState } from "react"

type PickerProps = {
    players: string[];
    captainsAmount: number;
    teamsHandler: (array: string[][]) => void;
    phaseHandler: () => void;
}

export default function Picker({ players, captainsAmount, teamsHandler, phaseHandler }: PickerProps) {

    const captains = players.slice(0, captainsAmount)

    const [freePlayers, setFreePlayers] = useState<string[]>(players.slice(captainsAmount))
    const [pickTurn, setPickTurn] = useState(0)
    const [teams, setTeams] = useState<string[][]>([])

    useEffect(() => {
        const initialTeams = Array.from(
            { length: captainsAmount },
            (_, i) => [captains[i]]
        )
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTeams(initialTeams)
    }, [players, captainsAmount])

    useEffect(() => {
        if(freePlayers.length === 0) {
            teamsHandler(teams)
            phaseHandler()
        }
    }, [freePlayers])

    useEffect(() => {
        console.log(teams)
    }, [teams])

    const addToTeam = (player: string) => {

        setTeams(prev => {
            const newTeams = prev.map(team => [...team])
            newTeams[pickTurn].push(player)
            return newTeams
        })

        setFreePlayers(prev => prev.filter(p => p !== player))
        setPickTurn(prev => prev < captainsAmount - 1 ? prev + 1 : 0)
    }

    return (
        <div className="p-6 space-y-6 w-1/2 mx-auto text-center">

            <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Joueurs sans équipe</h2>

                <ul className="bg-gray-800 text-white p-3 rounded-lg space-y-1">
                    {freePlayers.map(player => (
                        <li key={player} onClick={() => addToTeam(player)} className="p-2 cursor-pointer hover:bg-gray-700 rounded transition">
                            {player}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
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

                            {pickTurn === i && freePlayers.length > 0 && (
                                <p className="mt-2 text-sm text-green-300 animate-pulse">
                                    ➤ À toi de drafter ici
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
