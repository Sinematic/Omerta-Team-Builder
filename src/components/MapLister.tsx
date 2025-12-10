import mapsData from "../data/maps.json"
import MapCard from "./MapCard"

type MapListerProps = {
    mapSelecter?: (name: string, image:string) => void;
}

export default function MapLister({ mapSelecter } : MapListerProps) {

    const maps = mapsData.maps

    return (
        <ul className="grid grid-cols-3 sm:grid-cols-3 gap-4 p-40 justify-center">
            {maps.map((mapItem) => <MapCard key={mapItem.name} name={mapItem.name} image={mapItem.image} mapSetter={mapSelecter} /> )}
        </ul>
    )
}
