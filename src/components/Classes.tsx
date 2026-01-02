import playersData from "@/data/players.json"
import type { Player } from "@/types/dofus"
import PlayerCard from "@/components/UI/PlayerCard"

type ClassesType = {
	participants ?: string[]
}


export default function Classes({ participants = [] } : ClassesType ) {


	const data : Player[] = playersData as Player[]
	/*
	const players : Player[] = participants
		? data.filter((player) => participants.includes(player.name)) 
		: playersData
	*/

	const players = participants.length ? data.filter((player) => participants.includes(player.name)) : playersData


    return (
		<div className="block py-6 px-12 w-4/5 mx-auto">
			{players ? 
				<ul className="flex flex-col gap-4">
					{players.map(player => (
						<PlayerCard key={player.name} playerInfo={player} />
					))}
				</ul>
			: null}
		</div>
    )
}
