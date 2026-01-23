import playersData from "@/data/players.json"
import { type Player } from "@/types/dofus"
import PlayerCard from "@/features/classesOfPlayers/PlayerCard"
import { useNavigate } from "react-router"
import { sortPlayersByName } from "@/utils/players"


type ClassesType = {
	participants ?: string[]
}


export default function ClassesOfPlayers({ participants = [] } : ClassesType ) {

	const data : Player[] = playersData.map((player) => ({
		name: player.name,
		classes: player.classes
	}))
	
	const players = participants.length 
	? data.filter((player) => participants.includes(player.name)) 
	: sortPlayersByName()

	const navigate = useNavigate()


    return (
		<div className="block w-full p-4 pb-[70px] md:py-6 md:px-12 md:w-4/5 mx-auto select-none cursor-pointer">
			{players ? 
				<ul className="flex flex-col gap-1 md:gap-4">
					{players.map(player => (
						<PlayerCard key={player.name} playerInfo={player} action={() => navigate("/stats/" + player.name.toLowerCase())} />
					))}
				</ul>
			: null}
		</div>
    )
}
