import playersData from "@/data/players.json"
import { type Player } from "@/types/dofus"
import PlayerCard from "@/components/UI/PlayerCard"
import { useNavigate } from "react-router"


type ClassesType = {
	participants ?: string[]
}


export default function Classes({ participants = [] } : ClassesType ) {


	const data : Player[] = playersData.map((player) => ({
		name: player.name,
		classes: player.classes
	}))
	
	const players = participants.length ? data.filter((player) => participants.includes(player.name)) : data

	const navigate = useNavigate()


    return (
		<div className="block py-6 px-12 w-4/5 mx-auto select-none cursor-pointer">
			{players ? 
				<ul className="flex flex-col gap-4">
					{players.map(player => (
						<PlayerCard key={player.name} playerInfo={player} action={() => navigate("/stats/" + player.name.toLowerCase())} />
					))}
				</ul>
			: null}
		</div>
    )
}
