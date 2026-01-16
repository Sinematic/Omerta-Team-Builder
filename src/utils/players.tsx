import playersData from "@/data/players.json"
import { type Player } from "@/types/dofus"

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