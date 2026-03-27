import { useState } from "react"
import trashIcon from "/images/icons/trash.png"
import type { MapType } from "@/hooks/useTeamBuilder"
import Button from "@/components/UI/Button"


type MapCardProps = {
    map: MapType
    mapSetter?: (map : MapType) => void
    excludeMap?: (name: string) => void
}


export default function MapCard({ map, mapSetter, excludeMap }: MapCardProps) {

    const [confirmOpen, setConfirmOpen] = useState(false)

    // top = #3c3e44 bottom = #292b2f
    const handleClick = () => { 
        if(!mapSetter) return
        if(!confirmOpen) setConfirmOpen(true)
    }


    return (
        <li onClick={handleClick} className="cursor-pointer select-none flex flex-col items-center bg-[rgb(var(--dark-green))] p-2 rounded-lg relative">
            <h3 className="text-[rgb(var(--text))] text-lg font-semibold mb-2 bg-[rgb(var(--very-dark-green))] w-full text-center rounded-lg py-1">{map.name}</h3>
            <div className="h-full w-full bg-gradient-to-b from-[#3c3e44] to-[#292b2f] flex items-center">
                <img src={map.image} alt={map.name} className="w-full object-cover rounded-lg shadow-md" />
            </div>

            {excludeMap && 
                <div className="w-[36px] p-[2px] bg-[rgb(var(--slate))] absolute top-2 right-2 rounded-md" onClick={(e) => {
                    e.stopPropagation()
                    excludeMap?.(map.name)
                }} >
                    <img src={trashIcon} alt="Supprimer carte" />
                </div>
            }

            {confirmOpen && mapSetter && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center rounded-lg z-10"
                onClick={(e) => e.stopPropagation()}>
                    <p className="text-white text-md mb-2">Sélectionner <span className="font-bold">{map.name}</span> ?</p>

                    <div className="flex gap-2">
                        <Button text="Valider" action={() => mapSetter(map)} />
                        <Button text="Annuler" action={() => setConfirmOpen(false)} color="bg-[rgb(var(--warning))]"/>
                    </div>
                </div>
            )}
        </li>
    )
}