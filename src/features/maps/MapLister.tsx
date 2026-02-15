import mapsData from "@/data/maps.json"
import MapCard from "@/features/maps/MapCard"
import Button from "@/components/UI/Button"
import { isSmallScreen, setRandomMap } from "@/utils/players"
import { useState } from "react"

type MapListerProps = {
    mapSelecter?: (name: string, image:string) => void
    randomMapButton?: boolean
}

export default function MapLister({ mapSelecter, randomMapButton } : MapListerProps) {

    const maps = mapsData.maps
    const smallScreen = isSmallScreen()

    const [mapsAllowed, setMapsAllowed] = useState(maps)

    //const excludeMap = (name: string) => setMapsAllowed([...mapsAllowed.filter(map => map.name !== name)])


    return (
        <div>
            <ul className="grid grid-cols-1 gap-4 justify-center px-4 py-8 pb-[70px] select-none md:grid-cols-3 md:p-20 md:pb-20">

                {randomMapButton && mapSelecter ? 
                    <Button action={() => setRandomMap(mapSelecter, mapsAllowed)} color="bg-[rgb(var(--primary))] text-[rgb(var(--text))]" text="Aléatoire" 
                    specifiedClasses={"absolute mx-auto center justify-center " + (smallScreen ? "top-20 right-4" : "top-25 right-40")} />
                    
                : null}

                <Button action={() => setMapsAllowed(maps)} color="bg-[rgb(var(--primary))] text-[rgb(var(--text))]" text="Reset" 
                    specifiedClasses={"absolute mx-auto center justify-center " + (smallScreen ? "top-20 right-30" : "top-25 right-80")} />

                {mapsAllowed.map((mapItem) => 
                    <MapCard key={mapItem.name} name={mapItem.name} image={mapItem.image} mapSetter={mapSelecter} /*excludeMap={excludeMap}*/ />
                )}
            </ul>
        </div>

    )
}
