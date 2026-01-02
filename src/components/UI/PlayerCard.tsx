import type { DofusClasses, Player } from "@/types/dofus"


export default function PlayerCard({ playerInfo, classesInfo }: { playerInfo : Player, classesInfo : DofusClasses  }) {

    return (

        <div className="flex flex-wrap items-center gap-4 px-4 py-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">

            <span className="font-semibold text-lg min-w-[80px]">{playerInfo.name}</span>

            <div className="flex flex-wrap gap-4">
                {playerInfo.classes.map((cls) => (
                    <span key={cls} className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-medium font-medium">
                        {classesInfo[cls].emoji} {classesInfo[cls].name}
                    </span>
                ))}
            </div>

        </div>
    )
}

