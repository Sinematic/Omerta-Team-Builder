export interface DofusClass {
    name: string;
    emoji: string;
    short: string;
    image: string;
}

export type DofusClasses = Record<string, DofusClass>

export interface Player {
    name: string;
    classes: string[];
}

export type Match = ({
    result: string
    side: string
    classPlayed: string
    points: number
    details: string[]
} | null)

export type PlayerInfoType = [string, ...(string | null)[]]