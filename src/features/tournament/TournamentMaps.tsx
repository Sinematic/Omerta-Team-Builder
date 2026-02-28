import MapLister from "@/features/maps/MapLister"
import { useState } from "react"
import MapCard from "../maps/MapCard"


export default function TournamentMaps() {

    const [mapUsed, setMapUsed] = useState({name:"", image:""})


    return (
        <div className="w-full h-full min-h-[75vh] flex items-center flex-col mt-16">
            <h1 className="text-[rgb(var(--text))] text-3xl font-semibold">Tournoi 2v2</h1>

            {!mapUsed.name 
                ? <MapLister mapSelecter={(name, image) => setMapUsed({name, image})} randomMapButton resetOptions mapsSet="koloMaps" />
                : <div className="w-full max-w-[720px] mx-auto mt-16">
                    <MapCard name={mapUsed.name} image={mapUsed.image} />
                </div>
            }
        </div>
    )
}
