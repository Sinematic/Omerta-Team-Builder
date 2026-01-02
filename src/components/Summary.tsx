import MapCard from "@/components/Maps/MapCard";

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

    const shuffle = [...teamColors].sort(() => Math.random() -0.5)



export default function Summary({ map, teams }: SummaryProps) {

    return (
        <div className="mx-auto mt-16 max-w-4xl text-white">

            <h1 className="text-4xl font-bold text-center mb-6">Résumé</h1>

            <div className="text-center mx-auto mt-4 mb-8 space-y-6">

                {teams.map((team, teamIndex) => (
                    <ol key={teamIndex} className="flex justify-center flex-wrap">

                        {team.map((member, memberIndex) => (
                            <li key={member} className={`${shuffle[teamIndex % shuffle.length]} 
                                px-4 py-2 text-white shadow-md min-w-[150px] 
                                ${memberIndex === 0 ? 'rounded-l-lg' : ''} 
                                ${memberIndex === team.length - 1 ? 'rounded-r-lg' : ''} 
                                ${memberIndex !== 0 ? '-ml-1' : ''} 
                                border border-gray-700`}>
                                {member}
                            </li>
                        ))}
                    </ol>
                ))}

                <span className="text-3xl font-bold text-yellow-400 select-none animate-pulse">VS</span>

            </div>

            <div className="flex justify-center mt-6">
                <MapCard name={map.name} image={map.image} />
            </div>

        </div>
    );
}
