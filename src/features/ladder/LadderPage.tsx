import Card from "@/components/UI/Card"
import { useState } from "react"
import Ladder from "./Ladder"

export type LadderType = ("Ladder Classique" | "Ladder Focus" | "Ladder Event")


export default function LadderPage() {

	const [title, setTitle] = useState< LadderType | "">("")
    

    return (
		<div className="h-screen grid place-items-center">

			{!title ? 
				<div className="w-full h-[70vh] md:w-[90vh] md:h-[70vh] flex flex-cols justify-center gap-2 mx-auto p-2 md:mt-16">

					<Card text="Ladder Classique" image="/images/wallpapers/statulipe.webp" action={() => setTitle("Ladder Classique")} 
					borderColor="border-[rgb(var(--lightest-gray))]" bgColor="bg-[rgb(var(--lightest-gray))]" />

					<Card text="Ladder Focus" image="/images/wallpapers/guerre.webp" action={() => setTitle("Ladder Focus")} 
					borderColor="border-[rgb(var(--lightest-gray))]" bgColor="bg-[rgb(var(--lightest-gray))]" />

					<Card text="Ladder Event" image="/images/wallpapers/pretresse-de-kao.png" action={() => setTitle("Ladder Event")} 
					borderColor="border-[rgb(var(--lightest-gray))]" bgColor="bg-[rgb(var(--lightest-gray))]" />

				</div> 

			: <Ladder page={title} setPage={setTitle} />}

		</div>
    )
}
