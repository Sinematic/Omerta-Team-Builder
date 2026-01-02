import playersData from "@/data/players.json"
import classesData from "@/data/classes.json"
import type { Player } from "@/types/dofus"
import PlayerCard from "@/components/UI/PlayerCard"

type ClassesType = {
	participants ?: string[]
}


export default function Classes({ participants = [] } : ClassesType ) {


	const players = playersData as Player[]
	/*
	const players : Player[] = participants
		? data.filter((player) => participants.includes(player.name)) 
		: playersData
	*/

	let dataToUse

	if(participants.length) dataToUse = playersData.filter((player) => participants.includes(player.name))
	else dataToUse = playersData

    return (
		<div className="block py-6 px-12 w-4/5 mx-auto">
			{dataToUse ? 
				<div className="flex flex-col gap-4">
					{players.map(player => (
						<PlayerCard key={player.name} playerInfo={player} classesInfo={classesData} />
					))}
				</div>
			: null}
		</div>
    )
}
