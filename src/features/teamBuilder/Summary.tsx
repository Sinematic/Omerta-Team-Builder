import React from "react"
import MapCard from "@/features/maps/MapCard"

type SummaryProps = {
    map: {
        name: string;
        image: string;
    };
    teams: string[][];
};

const teamColors = [
    "bg-red-900",
    "bg-blue-700",
    "bg-green-600",
    "bg-yellow-600",
    "bg-purple-600",
    "bg-pink-900"
]

const shuffle = [...teamColors].sort(() => Math.random() - 0.5)

export default function Summary({ map, teams }: SummaryProps) {


    return (
        <div className="md:h-[80vh] mx-auto mt-16 max-w-4xl text-white select-none mb-12 md:grid md:place-items-center ">

            <h1 className="text-3xl font-semibold text-center">Résumé</h1>

            <div className="text-center mx-auto space-y-4">

                {teams.map((team, teamIndex) => ( <React.Fragment key={teamIndex}>
                    <ol className="flex justify-center flex-wrap">

                        {team.map((member, memberIndex) => (
                            <li key={member + "-" + memberIndex} className={`${shuffle[teamIndex % shuffle.length]} 
                                px-4 py-2 text-white shadow-md min-w-[150px] font-semibold 
                                ${memberIndex === 0 ? 'rounded-l-lg' : ''} 
                                ${memberIndex === team.length - 1 ? 'rounded-r-lg' : ''} 
                                ${memberIndex !== 0 ? '-ml-1' : ''} 
                                border border-gray-700`}>
                                {member}
                            </li>
                        ))}
                    </ol>

                    {teamIndex < teams.length - 1 ? <p className="text-4xl font-bold text-yellow-400 animate-pulse">VS</p> : null}

                </React.Fragment>))}

            </div>

            <div className="flex justify-center mt-6">
                <MapCard name={map.name} image={map.image} />
            </div>

        </div>
    );
}
