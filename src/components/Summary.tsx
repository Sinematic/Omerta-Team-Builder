import MapCard from "./MapCard";

type SummaryProps = {
    map: {
        name: string;
        image: string;
    };
    teams: string[][];
};

export default function Summary({ map, teams }: SummaryProps) {

    console.log("teams : ", teams)

    return (
        <div className="mx-auto mt-16 max-w-4xl text-white">

            <h1 className="text-4xl font-bold text-center mb-6">Résumé</h1>

            <div className="text-center mx-auto mt-4 mb-8 space-y-6">

                {teams.map((team, teamIndex) => (
                    <ol key={teamIndex} className="flex justify-center gap-6 flex-wrap">
                        {team.map((member) => (
                            <li key={member} className="bg-gray-800 p-4 my-1 rounded-lg shadow-md min-w-[150px]">
                                {member}
                            </li>
                        ))}
                    </ol>
                ))}
            </div>

            <div className="flex justify-center mt-6">
                <MapCard name={map.name} image={map.image} />
            </div>

        </div>
    );
}
