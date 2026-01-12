import { useEffect,/* useState */} from "react"
import playersData from "@/data/players.json"
//import type SelectPlayers from "../TeamBuilder/SelectPlayers"


type Player = typeof playersData[number];
type PlayerName = Player["name"];

type Profile = { name: PlayerName | "", mainClass:  string }


export default function Profile() {

    const whoAmI = localStorage.getItem("whoAmI")

    //const [profile, setProfile] = useState<Profile>({ name: "", mainClass: ""})

    useEffect(() => {  
        
    },[whoAmI])

    //const setAsProfile = () => { setProfile({ name: playersData}) }

    return (
        <>
            {/*whoAmI ? <SelectPlayers participants={[] players={} handleClickOnParticipants={}} /> : <p className="text-white text-xl">toto</p> */}
        
        </>
    )
}
