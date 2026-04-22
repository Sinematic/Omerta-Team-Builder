import { useCallback, useEffect, useState } from "react"
import snakePickOrder from "@/data/snake-pick-order.json"
import PlayerCard from "@/features/classesOfPlayers/PlayerCard"
import { shuffleArray } from "@/utils/players"
import playersData from "@/data/players.json"
import type { Player } from "@/types/dofus"
import clsx from "clsx"
import Button from "@/components/UI/Button"
import ResetIcon from "@/../public/images/icons/reset.svg?react"


type PickerProps = {
    players: string[]
    captainsAmount: number
    teamsHandler: (array: string[][]) => void
    phaseHandler: () => void
}


export default function Picker({ players, captainsAmount, teamsHandler, phaseHandler }: PickerProps) {

    const [teams, setTeams] = useState<string[][]>(
        Array.from({ length: captainsAmount }, (_, i) => [players[i]])
    )
    const [pickIndex, setPickIndex] = useState<number>(0)
    const pickOrder = snakePickOrder[captainsAmount.toString() as "2" | "3" | "4"]?.[players.length % 4 === 0 ? '4' : '5']
    const freePlayers = players.filter(p => !teams.flat().includes(p))

    const resetCaptains = () => {
        const shuffled = shuffleArray(players)
        setTeams(Array.from({ length: captainsAmount }, (_, i) => [shuffled[i]]))
        setPickIndex(0)
    }

    const changeOneCaptain = (index: number) => {
        const shuffled = shuffleArray(freePlayers)
        setTeams(prev => 
            prev.map((team, i) => 
                i === index ? [shuffled[0]] : [team[0]]
            )
        )
        setPickIndex(0)
    }

    const addToTeam = useCallback((player: string) => {

        const currentTeamIndex = pickOrder?.[pickIndex] ?? pickIndex % captainsAmount
        
        setTeams(prev => {
            const newTeams = prev.map(team => [...team])
            if (!newTeams[currentTeamIndex]) return prev
            newTeams[currentTeamIndex].push(player)

            const remaining = players.filter(p => !newTeams.flat().includes(p))
            
            if (remaining.length === 1) {
                const lastTeamIndex = pickOrder?.[pickIndex + 1] ?? (pickIndex + 1) % captainsAmount
                if (newTeams[lastTeamIndex]) newTeams[lastTeamIndex].push(remaining[0])
            }

            return newTeams
    })

    setPickIndex(prev => prev + 1)
}, [pickOrder, pickIndex, captainsAmount, players])

    useEffect(() => {
        if (freePlayers.length === 0) {
            teamsHandler(teams)
            phaseHandler()
        }
    }, [freePlayers, addToTeam, teamsHandler, phaseHandler, teams])

    /* /!\ 
        Reroll carte / modale 
        Recherche avancée -> abandon ?
        Filtres sur les joueurs / classes
    */  
    return (
        <div className="px-4 space-y-6 mx-auto text-center select-none relative md:w-2/3 md:p-6">

            <div className="free-players md:w-2/3 mx-auto ">
                <h2 className="text-xl font-medium mb-4 text-[rgb(var(--text))]">Joueurs sans équipe</h2>
    
                <Button text="Reset capitaines" action={resetCaptains} color="bg-[rgb(var(--primary))]" specifiedClasses="absolute top-0 right-5" />

                <ul className="rounded-lg mx-auto">
                    {freePlayers.map(playerName => {
                        const playerInfo = playersData.find(p => p.name === playerName)
                        if (!playerInfo) return null

                        return <PlayerCard key={playerName} playerInfo={playerInfo as Player} action={() => addToTeam(playerName)} minified={true} />
                    })}
                </ul>                 

            </div>

            <div className="player-in-teams">
                <h2 className="text-xl font-semibold mb-4 text-[rgb(var(--text))]">Équipes</h2>

                <div className={clsx(
                    "grid gap-4 mx-auto justify-center grid-cols-2",
                    captainsAmount === 2 && "md:grid-cols-2 md:max-w-2/3 ",
                    captainsAmount === 3 && "md:grid-cols-3",
                    captainsAmount === 4 && "md:grid-cols-4"
                )} >

                    {teams.map((team, i) => (
                        <div key={i} className="relative bg-[rgb(var(--surface))] py-2 px-1 rounded text-[rgb(var(--text))] border-solid border-1 border-[rgb(var(--lightest-gray))] md:p-3 md:border-3">
                            
                            <h3 className="font-bold mb-2">💀 Capitaine : {team[0]}</h3>

                            <ResetIcon className="fill-current text-white absolute top-0.5 right-0.5 p-1 bg-[rgb(var(--dark-green))] rounded cursor-pointer md:top-2 md:right-2" style={{ width: 32, height: 32 }} onClick={() => changeOneCaptain(i)} />

                            <ul className="space-y-1">
                                {team.slice(1).map(member => (
                                    <li key={member} className="bg-[rgb(var(--bg))] p-1 rounded md:p-2 ">
                                        {member}
                                    </li>
                                ))}
                            </ul>

                            {pickOrder?.[pickIndex] === i && freePlayers.length > 0 && (
                                <p className="mt-2 text-sm text-[rgb(var(--lighter-green))] animate-pulse">
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
