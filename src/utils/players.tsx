import playersData from "@/data/players.json"
import { type Player } from "@/types/dofus"

export const getAllPlayers = (): Player[] => playersData.map(player => ({
        name: player.name,
        classes: player.classes
    }))

