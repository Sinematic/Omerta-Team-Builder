import mapsData from "@/data/maps.json"
import MapCard from "@/features/maps/MapCard"
import Button from "@/components/UI/Button"
import { setRandomMap } from "@/utils/players"
import { useState } from "react"

type MapListerProps = {
    mapSelecter?: (name: string, image:string) => void
    randomMapButton?: boolean
    resetOptions?: boolean
}

export default function MapLister({ mapSelecter, randomMapButton=false, resetOptions=false } : MapListerProps) {

    const maps = mapsData.maps

    const [mapsAllowed, setMapsAllowed] = useState(maps)

    //const excludeMap = (name: string) => setMapsAllowed([...mapsAllowed.filter(map => map.name !== name)])


    return (
        <div>
            <ul className="grid grid-cols-1 gap-4 justify-center px-4 py-8 pb-[70px] select-none md:grid-cols-3 md:p-20 md:pb-20">

                {randomMapButton && mapSelecter ? 
                    <Button action={() => setRandomMap(mapSelecter, mapsAllowed)} color="bg-[rgb(var(--primary))] text-[rgb(var(--text))]" text="Aléatoire" 
                    specifiedClasses={"absolute mx-auto center justify-center top-20 right-4 md:top-25 md:right-40"} />
                    
                : null}

                {resetOptions && <Button action={() => setMapsAllowed(maps)} color="bg-[rgb(var(--primary))] text-[rgb(var(--text))]" text="Recharger" 
                    specifiedClasses={"absolute mx-auto center justify-center top-20 right-35 md:top-25 md:right-70"} />
                }

                {mapsAllowed.map((mapItem) => 
                    <MapCard key={mapItem.name} name={mapItem.name} image={mapItem.image} mapSetter={mapSelecter} /*excludeMap={excludeMap}*/ />
                )}
            </ul>
        </div>

    )
}
