import mapsData from "@/data/maps.json"
import MapCard from "@/features/maps/MapCard"
import Button from "@/components/UI/Button"
import { isSmallScreen, setRandomMap } from "@/utils/players"

type MapListerProps = {
    mapSelecter?: (name: string, image:string) => void;
    randomMapButton?: boolean;
}

export default function MapLister({ mapSelecter, randomMapButton } : MapListerProps) {

    const maps = mapsData.maps

    const smallScreen = isSmallScreen()


    return (
        <div>
            <ul className="grid grid-cols-1 gap-4 justify-center px-4 py-8 select-none md:grid-cols-3 md:p-40">

                {randomMapButton && mapSelecter? <Button action={() => setRandomMap(mapSelecter)} color="bg-[rgb(var(--primary))] text-[rgb(var(--text))]" text="Aléatoire" 
                specifiedClasses={"absolute mx-auto center justify-center " + (smallScreen ? "top-20 right-4" : "top-25 right-40")} />
                : null}

                {maps.map((mapItem) => 
                    <MapCard key={mapItem.name} name={mapItem.name} image={mapItem.image} mapSetter={mapSelecter} />
                )}
            </ul>
        </div>

    )
}
