import Card from "@/components/UI/Card"
import { useState } from "react"
import Ladder from "./Ladder"

export type LadderType = ("Ladder Classique" | "Ladder Focus")


export default function LadderPage() {

	const [title, setTitle] = useState< LadderType | "">("")
    
    return (
		<div className="h-screen grid place-items-center">

			{!title ? 
				<div className="w-full h-[70vh] md:w-[70vh] md:h-[60vh] flex flex-cols justify-center gap-2 mx-auto p-2 md:mt-16">

					<Card text="Ladder Classique" image="/images/wallpapers/corruption.png" action={() => setTitle("Ladder Classique")} 
					borderColor="border-[rgb(var(--lightest-gray))]" bgColor="bg-[rgb(var(--lightest-gray))]" translate="translate-4"/>

					<Card text="Ladder Focus" image="/images/wallpapers/guerre.webp" action={() => setTitle("Ladder Focus")} 
					borderColor="border-[rgb(var(--lightest-gray))]" bgColor="bg-[rgb(var(--lightest-gray))]" />

				</div> 

			: <Ladder page={title} setPage={setTitle} />}

		</div>
    )
}
