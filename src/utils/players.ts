import playersData from "@/data/players.json"
import mapsData from "@/data/maps.json"
import { type Player, type Match } from "@/types/dofus"


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

export const parseMatch = (rawMatch: unknown): Match | null => {
    if (typeof rawMatch !== "string") return null

    const parts = rawMatch.split("-")
    if (parts.length < 4) return null

    const [side, result, classPlayed, points, details] = parts

    if (!side || !result || !classPlayed) return null

    const parsedPoints = Number(points)
    if (!Number.isFinite(parsedPoints)) return null

    return { side, result, classPlayed, points: parsedPoints, details: details ? details.split("") : [] }
}

export const shuffleArray = (array: string[]) => [...array].sort(() => Math.random() - 0.5)