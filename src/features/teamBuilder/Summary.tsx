import React, { useState } from "react"
import MapCard from "@/features/maps/MapCard"
import Card from "@/components/UI/Card"
import classesData from "@/data/classes.json"
import type { Player } from "@/types/dofus"
import { getAllPlayers } from "@/utils/players"


type SummaryProps = {
    map: {
        name: string;
        image: string;
    };
    teams: string[][];
}


export default function Summary({ map, teams }: SummaryProps) {

    const players : Player[] = getAllPlayers()

    const generateCustomPlayersList = (team: string[]) => team
        .map(name => players.find(player => player.name === name))
        .filter(Boolean) as Player[]

    const teamsData = teams.map(team => generateCustomPlayersList(team))

    const [teamsState, setTeamsState] = useState<Player[][]>(teamsData)

    const moveFirstToLast = (array: string[]) => {
        if (array.length <= 1) return array
        const [first, ...rest] = array
        return [...rest, first]
    }

    const displayNextImage = (player: Player) => {
        setTeamsState((prevTeams) => prevTeams.map((team) => 
            team.map((p) => p.name === player.name ? {...p, classes: moveFirstToLast(p.classes)} : p)
        )
    )}


    return (
        <div className="md:min-h-[80vh] w-full mx-auto mt-8 p-1 max-w-4xl text-[rgb(var(--text))] select-none mb-12 md:grid md:place-items-center gap-5">

            <h1 className="text-xl font-semibold text-center mb-4  md:text-3xl">Composition des équipes</h1>

            <div className="text-center mx-auto space-y-3 w-full">

                {teamsState.map((team, teamIndex) => ( <React.Fragment key={teamIndex}>
                    <ol className={"grid w-full h-[33vh] flex-wrap gap-1 " + (team.length === 4 ? "grid-cols-4" : "grid-cols-5")}>

                        {team.map((member, memberIndex) => (
                            <Card text={member!.name} image={classesData[member!.classes[0] as keyof typeof classesData].image} 
                            borderColor={`border-[rgb(var(--lightest-gray))]`} key={member + "-" + memberIndex}
                            action={() => displayNextImage(member)}/>
                        ))}
                    </ol>

                    {teamIndex < teams.length - 1 ? <p className="text-3xl font-bold text-yellow-400 animate-pulse">VS</p> : null}

                </React.Fragment>))}

            </div>

            <div className="flex justify-center md:w-[50vw] m-6">
                <MapCard name={map.name} image={map.image} />
            </div>

        </div>
    )
}
