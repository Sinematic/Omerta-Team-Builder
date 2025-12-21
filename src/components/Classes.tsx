import playersData from "../data/players.json"
import classesData from "../data/classes.json"
import type { DofusClasses, Player } from "../types/dofus"
import PlayerCard from "./PlayerCard"


export default function Classes() {

    const classesInfo = classesData satisfies DofusClasses;
    const players = playersData as Player[];


    return (
		<div className="block py-6 px-12 w-4/5 mx-auto">
			{players ? 
				<div className="flex flex-col gap-4">
					{players.map(player => (
						<PlayerCard key={player.name} playerInfo={player} classesInfo={classesInfo} />
					))}
				</div>
			: "erreur"}
		</div>
    )
}
