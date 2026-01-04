import { useStats } from "@/hooks/useStats"
import { useParams } from "react-router"
import playersData from "@/data/players.json"
import NotFound from "../UI/NotFound"


type playerInfoType = {
    name: string;
    matches: string[];
}

type Match = {
    result: string;
    classPlayed: string;
    side: string;
    points: number;
    details: string[];
}

type playerData = {
    name: string;
    matches : Match[];
}


export default function CallAPI() {

    const { pseudo } = useParams<{ pseudo: string}>()
    const players = playersData
    const playerFound = players.some(player => player.name.toLowerCase() === pseudo)

    const { data , isLoading } = useStats("Matchs", "A2:K33")

    let playersMatches : playerInfoType


    if(data) {
         playersMatches  = data.map(([name, ...matches]: playerData[]) => (
            {name, values: matches})
        )

        console.log(playersMatches)

    }
/*
    const guessMatches = () => {
        if (!playersMatches) return
    }*/




    //const findIndex = data.find("Fecafe")

    return (

        <div>
            {playerFound ? 
                <div>
                    
                    {isLoading && <p>Chargement...</p>}
                    {data && <pre className="text-white">{JSON.stringify(data, null, 2)}</pre>}
                </div>
            : <NotFound message={"Joueur introuvable !"} />}
        </div>

    )
}
