import React from "react"
import MapCard from "@/features/maps/MapCard"
import Card from "@/components/UI/Card";
import { getAllPlayers } from "@/utils/players";
import classesData from "@/data/classes.json"
import type { Player } from "@/types/dofus";

type SummaryProps = {
    map: {
        name: string;
        image: string;
    };
    teams: string[][];
}

const teamColors = [
    "border-teal-600 text-teal-600",
    "border-lime-600 text-lime-600",
    "border-cyan-600 text-cyan-600",
    "border-purple-600 text-purple-600",
    "border-rose-600 text-rose-600",
]

const shuffle = [...teamColors].sort(() => Math.random() - 0.5)


export default function Summary({ map, teams }: SummaryProps) {

    const players : Player[] = getAllPlayers()

    const generateCustomPlayersList = (team: string[]) => team
        .map(name => players.find(player => player.name === name))
        .filter(Boolean)

    const teamsData = teams.map(team => generateCustomPlayersList(team))


    return (
        <div className="md:min-h-[80vh] w-full mx-auto mt-8 max-w-4xl text-[rgb(var(--text))] select-none mb-12 md:grid md:place-items-center gap-5">

            <h1 className="text-3xl font-semibold text-center">Composition des équipes</h1>

            <div className="text-center mx-auto space-y-3 w-full">

                {teamsData.map((team, teamIndex) => ( <React.Fragment key={teamIndex}>
                    <ol className={"grid w-full h-[33vh] flex-wrap gap-1 " + (team.length === 4 ? "grid-cols-4" : "grid-cols-5")}>

                        {team.map((member, memberIndex) => (
                            <Card text={member!.name} image={classesData[member!.classes[0] as keyof typeof classesData].image} 
                            borderColor={`${shuffle[teamIndex % shuffle.length]}`} key={member + "-" + memberIndex}
                            />
                        ))}
                    </ol>

                    {teamIndex < teams.length - 1 ? <p className="text-3xl font-bold text-yellow-400 animate-pulse">VS</p> : null}

                </React.Fragment>))}

            </div>

            <div className="flex justify-center m-6">
                <MapCard name={map.name} image={map.image} />
            </div>

        </div>
    )
}
