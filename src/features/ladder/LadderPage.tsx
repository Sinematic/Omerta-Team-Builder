import Card from "@/components/UI/Card"
import { useState } from "react"
import Ladder from "./Ladder"

export type LadderType = ("Ladder Classique" | "Ladder Focus")


export default function LadderPage() {

	const [title, setTitle] = useState< LadderType | "">("")
    
    return (
		<div className="flex justify-center mt-6 mb-6">

			{!title ? 
				<div className="w-full h-[70vh] md:w-[70vh] md:h-[60vh] flex flex-cols justify-center gap-2 mx-auto p-2 md:mt-16">
					<Card text="Ladder Classique" image="/images/corruption.png" action={() => setTitle("Ladder Classique")} />
					<Card text="Ladder Focus" image="/images/guerre.webp" action={() => setTitle("Ladder Focus")} />
				</div> 

			: <Ladder page={title} />}

		</div>
    )
}
