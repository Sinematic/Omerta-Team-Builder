/*import { useEffect, useState } from "react"
import playersData from "@/data/players.json"


const players = playersData as const
type Player = typeof players[number];
type PlayerName = Player["name"];


export default function Profile() {

    const whoAmI = localStorage.getItem("whoAmI")

    const [profile, setProfile] = useState<{ name:  }>({})

    useEffect(() => {  },[whoAmI])

    return (
        <div></div>
    )
}
*/