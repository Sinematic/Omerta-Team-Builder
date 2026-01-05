import mapsData from "@/data/maps.json"
import MapCard from "@/components/Maps/MapCard"

type MapListerProps = {
    mapSelecter?: (name: string, image:string) => void;
    randomMapButton?: boolean;
}

export default function MapLister({ mapSelecter, randomMapButton } : MapListerProps) {

    const maps = mapsData.maps

    const setRandomMap = () => {
        const randomIndex = (Math.floor(Math.random() * maps.length) -1)
        if(mapSelecter) mapSelecter(maps[randomIndex].name, maps[randomIndex].image)
    }

    console.log(maps)

    return (
        <div className="relative">
            <ul className="grid grid-cols-3 sm:grid-cols-3 gap-4 p-40 justify-center select-none">

                {randomMapButton ? <button onClick={setRandomMap} 
                className="absolute bg-blue-500 text-white mx-auto center justify-center top-4 right-12 px-4 py-2 rounded-lg shadow-lg font-medium">
                    Aléatoire
                </button> : null}

                {maps.map((mapItem) => 
                    <MapCard key={mapItem.name} name={mapItem.name} image={mapItem.image} mapSetter={mapSelecter} />
                 )}
            </ul>
        </div>

    )
}
