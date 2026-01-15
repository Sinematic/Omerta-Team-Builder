import mapsData from "@/data/maps.json"
import MapCard from "@/components/Maps/MapCard"
import Button from "../UI/Button";

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


    return (
        <div className="relative">
            <ul className="grid grid-cols-1 gap-4 justify-center px-4 py-8 select-none md:grid-cols-3 md:p-40">

                {randomMapButton ? <Button action={setRandomMap} color="bg-blue-500 text-white" text="Aléatoire" 
                specifiedClasses="absolute mx-auto center justify-center top-4 right-12" />
                : null}

                {maps.map((mapItem) => 
                    <MapCard key={mapItem.name} name={mapItem.name} image={mapItem.image} mapSetter={mapSelecter} />
                 )}
            </ul>
        </div>

    )
}
