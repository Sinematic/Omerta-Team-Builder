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