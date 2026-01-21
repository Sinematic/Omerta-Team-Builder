import playersData from "@/data/players.json"
import mapsData from "@/data/maps.json"
import { type Player } from "@/types/dofus"

const maps = mapsData.maps

export const getAllPlayers = (): Player[] => playersData.map(player => ({
    name: player.name,
    classes: player.classes
}))

export const sortPlayersByName = (players=playersData): Player[] => (
    players.sort((a, b) => a.name.localeCompare(b.name, "fr", { sensitivity: "base" }))
)

export const isSmallScreen = () : boolean => {
    return window.innerWidth <= 640
}

export const setRandomMap = (selecter: (name: string, image:string) => void) => {
    const randomIndex = (Math.floor(Math.random() * maps.length) -1)
    selecter(maps[randomIndex].name, maps[randomIndex].image)
}