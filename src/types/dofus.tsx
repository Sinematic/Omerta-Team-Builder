export interface DofusClass {
    name: string;
    emoji: string;
}

export type DofusClasses = Record<string, DofusClass>;

export interface Player {
    name: string;
    classes: (keyof DofusClasses)[];
};